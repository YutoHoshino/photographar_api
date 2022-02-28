import { memo } from "react";

// templates
import { AuthLayout } from "components/templates/AuthLayout";

// organisms
import { SignInForm } from "components/organisms/SignIn/SignInForm";

export const SignIn = memo(() => {
  return (
    <AuthLayout>
      <SignInForm/>
    </AuthLayout>
  )
})