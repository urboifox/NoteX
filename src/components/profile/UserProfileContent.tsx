'use client';
import { updateUser } from "@/actions/userActions";
import icons from "@/lib/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Button from "../common/Button";
import Checkbox from "../common/Checkbox";
import Input from "../common/Input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UserProfileContent({ user }: { user: UserResponse}) {

    const [state, formAction] = useFormState(updateUser, { success: false });
    const [editMode, setEditMode] = useState(false);
    const [allChecked, setAllChecked] = useState(user.islamic);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordVerification, setPasswordVerification] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast.success("Profile updated successfully");
            setEditMode(false);
            setPassword("");
            setNewPassword("");
            setPasswordVerification("")
            router.refresh();
        }
    }, [state, router]);

    return (
        <form action={formAction} className="flex flex-col gap-5">
            <div className="flex items-center gap-5 justify-between">
                <Link className="w-max" href={"/"}>
                    <Button>{icons.angleLeft} Back</Button>
                </Link>

                <Button onClick={() => setEditMode(!editMode)}>
                    {editMode ? icons.editOff : icons.edit}
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row w-full items-center gap-5">
                <Input
                    className="flex-1 w-full"
                    label="Username"
                    name="username"
                    defaultValue={user.username}
                    disabled={!editMode}
                    error={state?.errors?.username}
                />
                <Input
                    className="flex-1 w-full"
                    label="Email"
                    name="email"
                    defaultValue={user.email}
                    disabled={!editMode}
                    error={state?.errors?.email}
                />
            </div>

            <div className="flex flex-wrap gap-5">
                <Checkbox
                    name="islamic"
                    label="Islamic Mode"
                    checked={user.islamic}
                    onChange={(e) => {
                        setAllChecked(e.target.checked);
                    }}
                    disabled={!editMode}
                />

                <Checkbox
                    name="islamicAzan"
                    label="Azan"
                    checked={user.islamicAzan && allChecked}
                    disabled={!editMode}
                />

                <Checkbox
                    name="islamicAzkar"
                    label="Azkar"
                    checked={user.islamicAzkar && allChecked}
                    disabled={!editMode}
                />
            </div>

            <div className="flex flex-col gap-5">
                <Input
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    type="password"
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    name="password"
                    disabled={!editMode}
                    error={state?.errors?.password}
                />
                <Input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    label="New Password"
                    type="password"
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    name="newPassword"
                    disabled={!editMode}
                    error={state?.errors?.newPassword}
                />
                <Input
                    value={passwordVerification}
                    onChange={(e) => setPasswordVerification(e.target.value)}
                    label="New Password Confirmation"
                    type="password"
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    name="passwordVerification"
                    disabled={!editMode}
                    error={state?.errors?.passwordVerification}
                />
            </div>
                
            <SubmitButton disabled={!editMode} />
        </form>
    );
}

function SubmitButton({disabled}: {disabled: boolean}) {
    const { pending } = useFormStatus();
    return (
        <Button disabled={ disabled || pending } type="submit">
            {pending ? "Saving..." : "Save"}
        </Button>
    );
}
