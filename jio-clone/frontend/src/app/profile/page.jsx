"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { User } from "lucide-react";
import Login from "./../login/page"; 
import Signup from "./../signup/page"; 

export default function AuthModal({ open, setOpen }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="p-6 max-w-md">
      <DialogTitle>{isLogin ? "Login" : "Sign Up"}</DialogTitle>

      {isLogin ? <Login /> : <Signup />}

      <p className="text-sm text-center mt-2">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span
          className="text-blue-600 cursor-pointer ml-1"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
    </DialogContent>
  </Dialog>
  );
}
