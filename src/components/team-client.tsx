"use client";

import { NewMemberCard } from "./new-member-card";
import { TeamMemberCard } from "./team-member-card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MemberType, TarotCardType, TeamType } from "@/lib/types";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";

interface TeamClientProps {
  taroCards: TarotCardType[];
  teams: TeamType[];
}

const teamSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
});

type TeamFormData = z.infer<typeof teamSchema>;

export function TeamClient({ taroCards, teams }: TeamClientProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
  });
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<MemberType[]>(teams[0]?.members || []);
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const fetchMembers = async () => {
    try {
      const response = await fetch(`/api/team/${teams[0].id}/members`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch members");
      }
      const data = await response.json();
      setMembers(data);
      router.refresh();
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    if (!userId) {
      router.push("/auth/login");
    }
  }, [userId, router]);

  const handleCreateTeam = async (data: TeamFormData) => {
    const capitalizedTeamName = capitalizeFirstLetter(data.teamName);

    if (userId) {
      try {
        await fetch("/api/team", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: capitalizedTeamName, userId }),
        });

        // if (response.ok) {
        //   const newTeam = await response.json();
        //   setTeamState({
        //     ...newTeam,
        //     members: []
        //   });
        // } else {
        //   console.error('Failed to create team');
        // }
      } catch (error) {
        console.error("Error creating team:", error);
      } finally {
        router.refresh();
        toast.success("Команда создана!");
      }
    } else {
      console.error("User ID is undefined");
    }
  };

  // const teamsId = teams.map((team) => team.id).join(" & ");

  if (!teams || teams.length === 0) {
    return (
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1, ease: "easeInOut" }}
        className="w-full flex items-center justify-center"
      >
        <form
          onSubmit={handleSubmit(handleCreateTeam)}
          className="w-full mt-32 flex 
				flex-col items-center justify-center gap-y-16"
        >
          <Input
            type="text"
            value={teamName}
            {...register("teamName")}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Название Команды"
            className="w-full h-32 p-2 py-4 text-bold border rounded
          bg-transparent border-none shadow-none text-8xl text-black focus:outline-none
          placeholder:text-black text-center"
          />
          +
          {errors.teamName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.teamName.message}
            </p>
          )}
          <Button
            className="w-full py-8 mt-8 bg-[#297878]
							rounded-2xl h-12 text-3xl text-white
							hover:brightness-125 transition-all duration-300 shadow-xl"
            type="submit"
          >
            Создать команду
          </Button>
        </form>
      </motion.div>
    );
  }

  return (
    <div className="w-full min-h-screen p-8">
      {teams ? (
        <div className="w-full max-w-[2100px] mx-auto">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.2, ease: "easeInOut" }}
            className="text-5xl text-black mb-12 pl-4"
          >
            {teams.map((team) => team.name).join(" & ")}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="grid auto-rows-min grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
  gap-6 px-4 place-items-start"
          >
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 1.6 + index * 0.1,
                  ease: "easeOut",
                }}
                className="w-full h-[450px]" // Set consistent height
              >
                <TeamMemberCard member={member} />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 1.6 + members.length * 0.1,
                ease: "easeOut",
              }}
              className="w-full h-[450px] z-10" // Set consistent height
            >
              <NewMemberCard
                teamId={teams[0].id}
                taroCards={taroCards}
                onMemberAdded={fetchMembers}
              />
            </motion.div>
          </motion.div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
