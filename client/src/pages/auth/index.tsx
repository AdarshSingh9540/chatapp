import Background from '@/assests/login2.png';
import Victory from '@/assests/victory.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '../../lib/api-client';
import { LOGIN_ROUTES, SIGNUP_ROUTES } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';


const Auth = () =>{
    const navigate = useNavigate();
    const {setUserInfo} = useAppStore() as {setUserInfo:any};
    const [email, setEmail] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [password ,setPassword] = useState("");

    const validateSignup = () =>{
        if(!email.length){
            toast.error("Email is Require");
            return false;
        }
        if(!password.length){
            toast.error("Passeord is Required");
            return false;
        }
        if(password !== confirmpassword){
            toast.error("password and confirmpasseord should be same");
            return false;
        }
        return true;
    }

    const validateLogin = () =>{
        if(!email.length){
            toast.error("Email is Require");
            return false;
        }
        if(!password.length){
            toast.error("Passeord is Required");
            return false;
        }
        return true;
    }
    const handleLogin = async () =>{
        if(validateLogin()){
            const response = await apiClient.post(LOGIN_ROUTES,{email,password},{withCredentials:true});
            if(response.data.user.id){
                setUserInfo(response.data.user);
               if(response.data.user.profileSetup) navigate('/chat');
               else navigate('/profile')
            }
            console.log(response)
        }
    }
    const handleSignup = async () =>{
        if(validateSignup()){
            const response = await apiClient.post(SIGNUP_ROUTES,
                {email,password},
                {withCredentials:true}
            );
            setUserInfo(response.data.user);

            if(response.status ===201){
                navigate('/profile')
            }
               console.log({response})
            alert("done");
        }
    }
    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
          <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-vw[80vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid ">
            <div className="flex flex-col gap-10 items-center justify-center">
                <div className="flex items-center justify-center flex-col">
                    <div className="flex items-center justify-center">
                        <h1 className="text-5xl font-bold md:text-6xl ">WELCOME</h1>
                        <img src={Victory} alt="" className='h-[100px]' />
                    </div>
                    <p className='font-medium text-center'>Fill in the details to get started with the best chat app!</p>
                </div>
                <div>
                    <div className="flex items-center justify-center w-full">
                        <Tabs className='w-full' defaultValue='login'>
                            <TabsList className='bg-transparent rounded-none w-3/4'>
                                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black  data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value='login'>Login</TabsTrigger>
                                <TabsTrigger
                                className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black  data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" 
                                value='signup'>Signup</TabsTrigger>
                            </TabsList>
                            <TabsContent className='flex flex-col gap-5' value="login">
                            <Input placeholder='email' className='rounded-full  p-6 '
                                value={email}
                                onChange={(e)=>
                                    setEmail(e.target.value)
                                }
                                />
                                <Input placeholder='password'
                                className='rounded-full p-6'
                                value={password}
                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                }}
                                />
                                <Button className='roundd-full p-6 '
                                onClick={handleLogin}
                                >Login</Button>
                            </TabsContent>
                            <TabsContent
                            className='flex flex-col gap-5'
                            value="signup">
                            <Input placeholder='email' className='rounded-full  p-6 '
                                value={email}
                                onChange={(e)=>
                                    setEmail(e.target.value)
                                }
                                />
                                <Input placeholder='password'
                                className='rounded-full p-6'
                                value={password}
                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                }}
                                />
                                
                                <Input
                                value={confirmpassword}
                                placeholder='confirm password'
                                className='p-6 rounded-full'
                                onChange={(e)=>{
                                    setConfirmpassword(e.target.value)
                                }}
                                />
                                <Button className='roundd-full p-6 '
                                onClick={handleSignup}
                                >SignUp</Button>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                {/* <div className='hidden xl:flex justify-center items-center'>
                    <img src={Background} alt="" className='h-[700px]'/>
                </div> */}
            </div>
            </div>    
        </div>
    )
}
;
export default Auth;