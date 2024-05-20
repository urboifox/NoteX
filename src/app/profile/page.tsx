import UserProfileContent from "@/components/profile/UserProfileContent";
import { getUser } from "@/functions/users";

export default async function ProfilePage() {

    const user = await getUser();

    return (
      <div className="container page">
        <UserProfileContent user={JSON.parse(JSON.stringify(user))} />
      </div>
    );
}
