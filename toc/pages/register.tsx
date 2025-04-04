// This feature/add-login-page branch is from feature/add-register-page

import RootLayout from "@/components/Layout";
import RegisterForm from "@/components/RegisterForm";
import { ReactElement } from "react";

const Register = () => {
    return (
        <div className="bg-base-200 h-full py-10 overflow-y-auto">
            <div className="card rounded-lg shadow-lg bg-white w-2/5 mx-auto overflow-hidden grid grid-cols-2">
                {/* Left Section: Form */}
                <div className="py-20 px-5">
                    <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

                    <div className="flex justify-center mb-4 w-full">
                        <RegisterForm />
                    </div>
                </div>

                {/* Right Section: Info Panel */}
                <div className="bg-info text-white p-10">
                    <h2 className="text-2xl font-semibold text-center mb-4">Welcome</h2>
                    <p className="text-sm leading-relaxed text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
        </div>
    );
}

Register.getLayout = function getLayout(page: ReactElement) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
}

export default Register;