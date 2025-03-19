import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "@/app/nameInput/page";
import { useState } from "react";

type EditProps = {
  data: FormData;
};
export function EditUser({ data }: EditProps) {
  const [editData, setEditData] = useState(data);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (id: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:4000/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...editData, id: id }),
      });
      const userData = await res.json();
      setEditData(userData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name</Label>

              <Input
                id="username"
                onChange={handleChange}
                value={editData.name}
                name="name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Age</Label>
              <Input
                id="age"
                onChange={handleChange}
                value={editData.age}
                name="age"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Phone Number</Label>
              <Input
                id="phoneNumber"
                onChange={handleChange}
                value={editData.phoneNumber}
                name="phoneNumber"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => handleSubmit(editData._id)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
