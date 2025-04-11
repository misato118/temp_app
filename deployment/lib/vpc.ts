import { Stack } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";

interface ExtendedProps extends cdk.StackProps {
    vpcCidr: string | undefined;
}

export class VPC extends Stack {
    constructor(scope: Construct, id: string, props: ExtendedProps) {
        super(scope, id, props);

        const vpc = new ec2.Vpc(this, "VPC", {
            ipAddresses: ec2.IpAddresses.cidr(`${props.vpcCidr}`),
            subnetConfiguration: [
                {
                    cidrMask: 20,
                    name: "toC-",
                    subnetType: ec2.SubnetType.PUBLIC,
                },
                {
                    cidrMask: 20,
                    name: "toB-",
                    subnetType: ec2.SubnetType.PUBLIC,
                },
                {
                    cidrMask: 20,
                    name: "toCSBastion-",
                    subnetType: ec2.SubnetType.PUBLIC,
                },
                {
                    cidrMask: 20,
                    name: "Private-",
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                },
                {
                    cidrMask: 21,
                    name: "Private-DB-",
                    subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
                },
            ],
            availabilityZones: ["ca-central-1a", "ca-central-1b"],
            natGateways: 1,
        });
    }
}