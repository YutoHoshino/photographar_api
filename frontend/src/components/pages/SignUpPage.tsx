import { memo } from "react";

// templates
import { AuthLayout } from "components/templates/AuthLayout";

// organisms
import { SignUpForm } from "components/organisms/SignUp/SignUpForm";

export const SignUpPage = memo(() => {
  return (
    <AuthLayout>
      <SignUpForm/>
    </AuthLayout>
  )
})