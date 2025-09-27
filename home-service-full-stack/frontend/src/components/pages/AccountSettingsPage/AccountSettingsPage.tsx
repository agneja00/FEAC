import PageTitle from "@/components/common/PageTitle";
import { UserContext } from "@/components/context/UserContext";
import UpdateAccountForm from "@/components/user/UpdateAccountForm";
import { useContext } from "react";

const AccountSettingsPage = () => {
  const { user } = useContext(UserContext);

  if (!user?.email) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <PageTitle title="My account" />
      <UpdateAccountForm userEmail={user.email} />
    </>
  );
};

export default AccountSettingsPage;
