'use client'

import { useRouter } from "next/navigation";
import { Button } from "./ui/button"
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import { SheetComponent } from "./ui/sheet-component";
import { motion } from 'framer-motion';
import { SheetEdit } from "./ui/sheet-edit";

export function ActionButtons() {

	const router = useRouter();

	return (

		<motion.div 
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay : 0.7 }}
		className="flex flex-row items-center gap-x-2">
			<Button
				onClick={() => router.push('/start')}
				className="w-12 h-12 py-2 px-2 bg-black rounded-full border 
				border-neutral-800 hover:border-neutral-200 transition-colors peer"
			>	
				<PlusIcon className="text-white peer-hover:text-white" />
			</Button>

			{/* EDIT */}
			<SheetEdit />



			<Button
				className="w-12 h-12 py-2 px-2 bg-black rounded-full border 
				border-neutral-800 hover:border-neutral-200 transition-colors peer"
			>	
				<TrashIcon className="text-white peer-hover:text-white" />
			</Button>
			
			{/* SETTINGS */}
			<SheetComponent />
		</motion.div>
	)
}
