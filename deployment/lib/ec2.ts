import { CfnOutput, RemovalPolicy, Stack, Token } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import * as elbv2_tg from "aws-cdk-lib/aws-elasticloadbalancingv2-targets";

interface ExtendedProps extends cdk.StackProps {
    vpcId: string | undefined;
    vpcCidr: string | undefined;
}

export class EC2 extends Stack {
    constructor(scope: Construct, id: string, props: ExtendedProps) {
        super(scope, id, props);

        /* VPC */
        const vpc = ec2.Vpc.fromLookup(this, "VpcInEc2", {
            vpcId: props.vpcId,
        });

        /* Security Groups */
        const toCSG = new ec2.SecurityGroup(this, "ItemRentalApplicationToCSG", {
            vpc: vpc,
            allowAllOutbound: true,
            securityGroupName: "ItemRentalApplicationToCSG",
        });

        const toBSG = new ec2.SecurityGroup(this, "ItemRentalApplicationToBSG", {
            vpc: vpc,
            allowAllOutbound: true,
            securityGroupName: "ItemRentalApplicationToBSG",
        });

        const toCSBastionSG = new ec2.SecurityGroup(this, "ItemRentalApplicationToCSBastionSG", {
            vpc: vpc,
            allowAllOutbound: true,
            securityGroupName: "ItemRentalApplicationToCSBastion",
        });

        const serverSG = new ec2.SecurityGroup(this, "ItemRentalApplicationServerSG", {
            vpc: vpc,
            allowAllOutbound: true,
            securityGroupName: "ItemRentalApplicationServerSG",
        });

        const databaseSG = new ec2.SecurityGroup(this, "ItemRentalApplicationDatabaseSG", {
            vpc: vpc,
            allowAllOutbound: false,
            securityGroupName: "ItemRentalApplicationDatabaseSG",
        });

        const albSG = new ec2.SecurityGroup(this, "ItemRentalApplicationAlbSG", {
            vpc: vpc,
            allowAllOutbound: true,
            securityGroupName: "ItemRentalApplicationAlbSG",
        });

        albSG.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(80)
        );

        /* SSH */
        toCSG.addIngressRule(
            ec2.Peer.securityGroupId(toCSBastionSG.securityGroupId),
            ec2.Port.tcp(22) // SSH port,            
        );

        toBSG.addIngressRule(
            ec2.Peer.securityGroupId(toCSBastionSG.securityGroupId),
            ec2.Port.tcp(22) // SSH port,                
        );

        toCSBastionSG.addIngressRule(
            ec2.Peer.ipv4(`${process.env.LOCAL_IP}/32`),
            ec2.Port.tcp(22) // SSH port,                 
        );

        serverSG.addIngressRule(
            ec2.Peer.securityGroupId(toCSBastionSG.securityGroupId),
            ec2.Port.tcp(22) // SSH port,            
        );

        /* HTTP to server */
        serverSG.addIngressRule(
            ec2.Peer.securityGroupId(toCSG.securityGroupId),
            ec2.Port.tcp(4000)
        );

        serverSG.addIngressRule(
            ec2.Peer.securityGroupId(toBSG.securityGroupId),
            ec2.Port.tcp(4000)
        );

        serverSG.addIngressRule(
            ec2.Peer.securityGroupId(toCSBastionSG.securityGroupId),
            ec2.Port.tcp(4000)
        );

        /* HTTP to frontend */
        toCSG.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(3000)
        );

        toBSG.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(3000)
        );

        toCSBastionSG.addIngressRule(
            ec2.Peer.anyIpv4(),
            ec2.Port.tcp(3000)
        );

        /* Server to Database */
        databaseSG.addIngressRule(
            ec2.Peer.securityGroupId(serverSG.securityGroupId),
            ec2.Port.tcp(5432)
        );

        // HTTP from a load balancer to frontend
        toCSG.addIngressRule(
            ec2.Peer.securityGroupId(albSG.securityGroupId),
            ec2.Port.tcp(4000)
        );

        toBSG.addIngressRule(
            ec2.Peer.securityGroupId(albSG.securityGroupId),
            ec2.Port.tcp(4000)
        );

        toCSBastionSG.addIngressRule(
            ec2.Peer.securityGroupId(albSG.securityGroupId),
            ec2.Port.tcp(4000)
        );

        serverSG.addIngressRule(
            ec2.Peer.securityGroupId(albSG.securityGroupId),
            ec2.Port.tcp(4000)
        );

        // SSH key
        const cfnToCKeyPair = new ec2.CfnKeyPair(this, "cfnToCKeyPair", {
            keyName: "item-rental-application-toc.pem",
        });
        cfnToCKeyPair.applyRemovalPolicy(RemovalPolicy.DESTROY);

        const cfnToBKeyPair = new ec2.CfnKeyPair(this, "cfnToBKeyPair", {
            keyName: "item-rental-application-tob.pem",
        });
        cfnToBKeyPair.applyRemovalPolicy(RemovalPolicy.DESTROY);

        const cfnToCSKeyPair = new ec2.CfnKeyPair(this, "cfnToCSKeyPair", {
            keyName: "item-rental-application-tocs.pem",
        });
        cfnToCSKeyPair.applyRemovalPolicy(RemovalPolicy.DESTROY);

        const cfnBastionKeyPair = new ec2.CfnKeyPair(this, "cfnBastionKeyPair", {
            keyName: "item-rental-application-bastion.pem",
        });
        cfnBastionKeyPair.applyRemovalPolicy(RemovalPolicy.DESTROY);

        const cfnServerKeyPair = new ec2.CfnKeyPair(this, "cfnServerKeyPair", {
            keyName: "item-rental-application-server.pem",
        });
        cfnServerKeyPair.applyRemovalPolicy(RemovalPolicy.DESTROY);

        // Key Pair
        new CfnOutput(this, "GetToCSSHKeyCommand", {
            value: `aws ssm get-parameter --name /ec2/keypair/${cfnToCKeyPair.getAtt(
                "KeyPairId"
            )}
      --region ${props.env?.region}
      --with-decryption toc
      --query Parameter.Value
      --output text`,
        });

        new CfnOutput(this, "GetToBSSHKeyCommand", {
            value: `aws ssm get-parameter --name /ec2/keypair/${cfnToBKeyPair.getAtt(
                "KeyPairId"
            )}
      --region ${props.env?.region}
      --with-decryption tob
      --query Parameter.Value
      --output text`,
        });

        new CfnOutput(this, "GetToCSSSHKeyCommand", {
            value: `aws ssm get-parameter --name /ec2/keypair/${cfnToCSKeyPair.getAtt(
                "KeyPairId"
            )}
      --region ${props.env?.region}
      --with-decryption tocs
      --query Parameter.Value
      --output text`,
        });

        new CfnOutput(this, "GetBastionSSHKeyCommand", {
            value: `aws ssm get-parameter --name /ec2/keypair/${cfnBastionKeyPair.getAtt(
                "KeyPairId"
            )}
      --region ${props.env?.region}
      --with-decryption bastion
      --query Parameter.Value
      --output text`,
        });

        new CfnOutput(this, "GetServerSSHKeyCommand", {
            value: `aws ssm get-parameter --name /ec2/keypair/${cfnServerKeyPair.getAtt(
                "KeyPairId"
            )}
      --region ${props.env?.region}
      --with-decryption server
      --query Parameter.Value
      --output text`,
        });

        const cfnKeyPair = new ec2.CfnKeyPair(this, "CfnKeyPair", {
            keyName: "item-rental-application.pem",
        });
        cfnKeyPair.applyRemovalPolicy(RemovalPolicy.DESTROY);

        new CfnOutput(this, "GetSSHKeyCommand", {
            value: `aws ssm get-parameter --name /ec2/keypair/${cfnKeyPair.getAtt(
                "KeyPairId"
            )}
      --region ${props.env?.region}
      --with-decryption
      --query Parameter.Value
      --output text`,
        });

        /* EC2 */
        const toCInstance = new ec2.Instance(this, "EC2ToC", {
            //  VPC
            vpc,
            // Subnet Group
            vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
            // Security Group
            securityGroup: toCSG,
            // EC2 instance type
            instanceType: ec2.InstanceType.of(
                ec2.InstanceClass.T2,
                ec2.InstanceSize.SMALL
            ),
            // EC2 instance AMI
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2023,
            }),
            // SSH key
            keyName: Token.asString(cfnToCKeyPair.ref),
            // Give EC2 IAM ssm permission
            ssmSessionPermissions: true,
        });

        const toBInstance = new ec2.Instance(this, "EC2ToB", {
            //  VPC
            vpc,
            // Subnet Group
            vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
            // Security Group
            securityGroup: toBSG,
            // EC2 instance type
            instanceType: ec2.InstanceType.of(
                ec2.InstanceClass.T2,
                ec2.InstanceSize.SMALL
            ),
            // EC2 instance AMI
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2023,
            }),
            // SSH key
            keyName: Token.asString(cfnToBKeyPair.ref),
            // Give EC2 IAM ssm permission
            ssmSessionPermissions: true,
        });

        const toCSInstance = new ec2.Instance(this, "EC2ToCS", {
            //  VPC
            vpc,
            // Subnet Group
            vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
            // Security Group
            securityGroup: toCSBastionSG,
            // EC2 instance type
            instanceType: ec2.InstanceType.of(
                ec2.InstanceClass.T2,
                ec2.InstanceSize.SMALL
            ),
            // EC2 instance AMI
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2023,
            }),
            // SSH key
            keyName: Token.asString(cfnToCSKeyPair.ref),
            // Give EC2 IAM ssm permission
            ssmSessionPermissions: true,
        });

        const bastionInstance = new ec2.Instance(this, "EC2Bastion", {
            //  VPC
            vpc,
            // Subnet Group
            vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
            // Security Group
            securityGroup: toCSBastionSG,
            // EC2 instance type
            instanceType: ec2.InstanceType.of(
                ec2.InstanceClass.T2,
                ec2.InstanceSize.SMALL
            ),
            // EC2 instance AMI
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2023,
            }),
            // SSH key
            keyName: Token.asString(cfnBastionKeyPair.ref),
            // Give EC2 IAM ssm permission
            ssmSessionPermissions: true,
        });

        const serverInstance = new ec2.Instance(this, "EC2Server", {
            //  VPC
            vpc,
            // Subnet Group
            vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
            // Security Group
            securityGroup: serverSG,
            // EC2 instance type
            instanceType: ec2.InstanceType.of(
                ec2.InstanceClass.T2,
                ec2.InstanceSize.SMALL
            ),
            // EC2 instance AMI
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2023,
            }),
            // SSH key
            keyName: Token.asString(cfnServerKeyPair.ref),
            // Give EC2 IAM ssm permission
            ssmSessionPermissions: true,
        });

        const alb = new elbv2.ApplicationLoadBalancer(this, "Alb", {
            internetFacing: true,
            vpc,
            vpcSubnets: {
                subnets: vpc.selectSubnets({
                    subnetGroupName: "toC-",
                }).subnets,
            },
            securityGroup: albSG,
        });

        // Create a ALB listener
        const albListener = alb.addListener("AlbHttpListener", {
            port: 80,
            protocol: elbv2.ApplicationProtocol.HTTP,
        });

        // Create ALB target groups
        const albTargetSever = new elbv2_tg.InstanceIdTarget(serverInstance.instanceId);

        albListener.addTargets("WebServerTarget", {
            targets: [albTargetSever],
            protocol: elbv2.ApplicationProtocol.HTTP,
            port: 4000,
            healthCheck: {
                path: "/health",
            },
        });
    }
}