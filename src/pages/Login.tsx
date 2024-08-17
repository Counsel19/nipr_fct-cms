import LabledInput from "@/components/shared/molecules/LabeledInput";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { login } from "@/lib/redux/slices/auth/authThunk";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {}
const Login: FC<LoginProps> = () => {
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState<{
    email: string;
    password: string;
  }>({
    password: "",
    email: "",
  });

  const { userProfile } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    userProfile && navigate("/account/profile");
  }, [navigate, userProfile]);

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputValue({ ...inputValue, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!inputValue.email || !inputValue.password) {
        return toast({
          title: "Invlid Input",
          description: "You haved not entered all fields",
          variant: "destructive",
        });
      }

      const res = await dispatch(
        login(inputValue)
      );
      if (res.type.includes("rejected"))
        return toast({
          title: "An Error Occurred",
          description: res.payload as string,
          variant: "destructive",
        });
      toast({
        title: "Login Successful",
        description: "You have logged in successfully",
        
      });

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          return toast({
            title: "Error Signing Up",
            description: error.response?.data,
            variant: "destructive",
          });
        }
      }

      toast({
        title: "Error Login in",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mb-5 bg-[#FAFAFA] h-screen flex flex-col ">
      <div className="w-full space-y-12 md:w-[480px] mx-auto mt-[5%] my-auto h-[400px] bg-[#fff] shadow rounded-lg border flex flex-col border-solid border-[#E6E7EC]  p-8 ">
        <div className="flex flex-col justify-center gap-6 items-center">
          <p className="text-xl font-medium text-[#101828]">Welcome back!</p>
          <p className="text-[#828282] text-base">Sign in to access</p>
        </div>
        <div className="h-[300px] mt-5">
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-10   "
          >
            <LabledInput
              label="Email"
              name="email"
              value={inputValue.email}
              setInputValue={handleOnchange}
            />
            <LabledInput
              label="Password"
              name="password"
              type="password"
              value={inputValue.password}
              setInputValue={handleOnchange}
            />

            <div className="flex justify-end">
              <Link
                className="font-medium text-base leading-[2rem] text-[#F6453C]"
                to="/forgot-password"
              >
                Forgot Password
              </Link>
            </div>

            <Button isLoading={loading} className="w-full bg-primary">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
