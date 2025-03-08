"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <User className="w-6 h-6" />
        </div>
      </DialogTrigger>
      <DialogContent className="p-6 max-w-md">
        <DialogTitle>{isLogin ? "Login" : "Sign Up"}</DialogTitle>
        {/* If you want to visually hide the title but keep it for screen readers */}
        {/* <VisuallyHidden><DialogTitle>Login</DialogTitle></VisuallyHidden> */}

        <form className="mt-4 space-y-3">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" className="mt-2" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" className="mt-2" type="password" placeholder="********" />
          </div>
          <Button className="w-full">{isLogin ? "Login" : "Sign Up"}</Button>
        </form>
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
