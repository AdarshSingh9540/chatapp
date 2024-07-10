import { useAppStore } from "../../store";

const Profile = () =>{
    const {userInfo} = useAppStore() as {userInfo:any};
    return (
        <div>
            profile: <div>Email : {userInfo.email}</div>
        </div>

    )
}

export default Profile;