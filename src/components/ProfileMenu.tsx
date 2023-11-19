"use client"

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SessionInterface } from "../../common.types";


const ProfileMenu = ({ session }: { session: SessionInterface }) => {
    console.log(session);
    const [openModal, setOpenModal] = useState(false);
    const src = `${session.user.avatarUrl}`;

    const ImageLink = "https://hyundai-cyprus.com/wp-content/uploads/admin/2021/02/SantaFe-3rd-generation_4x3.png"
    return (
        <div className="flexCenter z-10 flex-col relative">
            <Menu as="div">
                <Menu.Button className="flexCenter" onMouseEnter={() => setOpenModal(true)} >
                    {session?.user?.image && (
                        <Image
                        loader={() => src} src={src}
                            width={40}
                            height={40}
                            className="rounded-full border-radius"
                            alt="user profile image"
                        />
                    )}
                </Menu.Button>

                <Transition
                    show={openModal}
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        static
                        className="flexStart profile_menu-items"
                        onMouseLeave={() => setOpenModal(false)}
                    >
                        <div className="flex flex-col items-center gap-y-4">
                            {session?.user?.avatarUrl && (
                                <Image
                                loader={() => src} src={src}
                                    className="rounded-full border-radius"
                                    width={80}
                                    height={80}
                                    alt="profile Image"
                                />
                            )}
                            <p className="font-semibold">{session?.user?.name}</p>
                            <span className="text-sm" color="red">{session?.user?.rol}</span>
                           
                            {/* <Image
                                    src={ImageLink}
                                    className="rounded-full"
                                    width={40}
                                    height={40}
                                    alt="profile Image"
                                /> */}
                                <span className="text-sm" color="red">{session?.user?.ModeloHyundai} - {session?.user?.Placa} </span>
                        </div>

                        <div className="flex flex-col gap-2 pt-5 items-start w-full">
                            {/* <Menu.Item>
                                <Link href={`/profile/${session?.user?.id}`} className="text-sm">Work Preferences</Link>
                            </Menu.Item> */}
                            <Menu.Item>
                                <Link href={`/profile/${session?.user?.id}`} className="text-sm">Configuracion APP</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href={`/profile/${session?.user?.id}`} className="text-sm">Mi vehiculo</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href={`/profile/${session?.user?.id}`} className="text-sm">Mi perfil</Link>
                            </Menu.Item>
                        </div>
                        <div className="w-full flexStart border-t border-nav-border mt-5 pt-5">
                            <Menu.Item>
                                <button type="button" className="text-sm" onClick={() => signOut()}> 
                                    Sign out
                                </button>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default ProfileMenu