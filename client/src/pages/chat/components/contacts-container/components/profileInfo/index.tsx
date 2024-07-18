import { FiEdit2 } from 'react-icons/fi';
import { IoLogOut, IoPowerSharp } from 'react-icons/io5'; 
import { Avatar, AvatarImage } from '../../../../../../components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../../../../components/ui/tooltip';
import { useAppStore } from '../../../../../../store'
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../../../../lib/api-client';
import { LOG_OUT_ROUTE } from '../../../../../../utils/constant';

function ProfileInfo() {
    const navigate = useNavigate()
    const { userInfo ,setUserInfo } = useAppStore();

   const logOut = async() =>{

    try{
        const  response = await apiClient.post(
            LOG_OUT_ROUTE,
            {},
            {withCredentials:true}
        );

        if(response.status ===200){
            navigate("/auth");
            setUserInfo(null);
            
        }
    }catch(e){
        console.log(e)
    }
   }

  return (
    <div className='absolute bottom-0 h-15 flex items-center justify-center px-10 w-full bg-[#2a2b33] '> 
    
    <div className='flex gap-3 items-center justify-center'>
       <div className='w-12 h-12 relative'>
       <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                            {userInfo?.image ? (
                                <AvatarImage src={`${HOST}/${userInfo?.image}`} className="object-cover w-full h-full bg-black" />
                            ) : (
                                <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center rounded-full justify-center ${userInfo?.color}`}>
                                    {userInfo?.firstName ? userInfo?.firstName.charAt(0) :userInfo?.email.charAt(0)}
                                </div>
                            )}
                        </Avatar>
       </div>

       <div>
        {userInfo?.firstName && userInfo?.lastName ? `${userInfo?.firstName} ${userInfo?.lastName}` : ""}
       </div>
    </div>
    <div className="flex gap-5 ">
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
        <FiEdit2 
        onClick={() => navigate('/profile')}
        className='text-purple-500 text-xl font-medium' />
    </TooltipTrigger>
    <TooltipContent className='bg-[#1c1b1e] border-none text-white'>
      Edit Profile
    </TooltipContent>
  </Tooltip>
</TooltipProvider>


<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
        <IoPowerSharp
        onClick={logOut}
        className='text-red-500 text-xl font-medium' />
    </TooltipTrigger>
    <TooltipContent className='bg-[#1c1b1e] border-none text-white'>
      LogOut
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

    </div>
    </div>
  )
}

export default ProfileInfo