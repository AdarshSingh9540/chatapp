import { useEffect, useState } from "react";
import { useAppStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { colors, getColors } from "../../lib/utils";
import { FaTrash, FaPlus } from 'react-icons/fa';
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { apiClient } from "../../lib/api-client";
import { UPDATE_PROFILE_ROUTE } from "../../utils/constant";

const Profile = () => {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useAppStore() as { userInfo: any, setUserInfo: (userInfo: any) => void };
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [selectedColor, setSelectedColor] = useState(0);

    useEffect(() => {
        console.log("userInfo:", userInfo);
        if (userInfo && userInfo.profileSetup) {
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
            setSelectedColor(userInfo.color);
        }
    }, [userInfo]);

    const validateProfile = () => {
        if (!firstName) {
            toast.error("First name is required");
            return false;
        }
        if (!lastName) {
            toast.error("Last Name is required");
            return false;
        }
        return true;
    }

    const saveChanges = async () => {
        if (validateProfile()) {
            try {
                const response = await apiClient.post(UPDATE_PROFILE_ROUTE, { firstName, lastName, color: selectedColor }, { withCredentials: true });
                if (response.status === 200 && response.data) {
                    setUserInfo({ ...response.data });
                    toast.success("Profile updated successfully");
                    navigate('/chat');
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleImageUpload = (e:any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-[#1b1c24] h-screen flex items-center justify-center gap-10">
            <div className="flex flex-col gap-10 w-full max-w-screen-md">
                <div>
                    <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" onClick={() => navigate(-1)} />
                </div>
                <div className="grid grid-cols-2 gap-10">
                    <div className="h-48 md:h-64 relative flex items-center justify-center"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <Avatar className="h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden">
                            {image ? (
                                <AvatarImage src={image} className="object-cover w-full h-full bg-black" />
                            ) : (
                                <div className={`uppercase h-32 w-32 md:h-48 md:w-48 text-5xl border-[1px] flex items-center rounded-full justify-center ${getColors(selectedColor)}`}>
                                    {firstName ? firstName.charAt(0) : userInfo.email.charAt(0)}
                                </div>
                            )}
                        </Avatar>
                        {hovered && (
                            <div className="absolute  flex items-center justify-center bg-black/50 cursor-pointer rounded-full ">
                                {image ? <FaTrash className="text-white text-3xl cursor-pointer" /> : <FaPlus className="text-white text-3xl cursor-pointer" />}
                            </div>
                        )}
                        <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
                    </div>

                    <div className="flex flex-col gap-5 text-white">
                        <div>
                            <input type="email" placeholder="Email" disabled value={userInfo.email} className="p-4 rounded-lg bg-[#2c2e3b] border-none" />
                        </div>

                        <div>
                            <input type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="p-4 rounded-lg bg-[#2c2e3b] border-none"
                            />
                        </div>

                        <div>
                            <input type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="p-4 rounded-lg bg-[#2c2e3b] border-none"
                            />
                        </div>

                        <div className="flex gap-5">
                            {colors.map((color, index) => (
                                <div key={index}
                                    className={`${color} rounded-full cursor-pointer h-8 w-8 transition-all duration-300 ${selectedColor === index ? "outline outline-white/50 outline-1" : ""}`}
                                    onClick={() => setSelectedColor(index)}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <Button
                        onClick={saveChanges}
                        className="h-12 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Profile;
