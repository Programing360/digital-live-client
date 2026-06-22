"use client";

import React, { useState, useMemo } from "react";
import { Table, Avatar, Chip, Button, Tooltip, Input } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  UserPlus,
  Trash2,
  Search,
  Users,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import { userDelete, userRoleUpdate } from "@/lib/api/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Premium Sample Dataset
// const initialUsers = [
//   { id: "u-1", name: "Ried Hessan", email: "ried@example.com", role: "admin", image: "https://i.pravatar.cc/150?u=ried", lessons: 14 },
//   { id: "u-2", name: "Nusrat Jahan", email: "nusrat@example.com", role: "user", image: "https://i.pravatar.cc/150?u=nusrat", lessons: 8 },
//   { id: "u-3", name: "Alex Rivera", email: "alex.r@example.com", role: "user", image: "https://i.pravatar.cc/150?u=alex", lessons: 3 },
//   { id: "u-4", name: "Sarah Connor", email: "sarah@example.com", role: "admin", image: "https://i.pravatar.cc/150?u=sarah", lessons: 22 },
//   { id: "u-5", name: "Marcus Wright", email: "marcus.w@example.com", role: "user", image: "https://i.pravatar.cc/150?u=marcus", lessons: 0 }
// ];

export default function ManageUsersPage({ allLessons, allUser }) {
  const [users, setUsers] = useState(allUser);
  const [search, setSearch] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

  const router = useRouter();

  // 1. ACTION: Promote a standard user to an Administrator
  const handlePromote = async (userInfo) => {
    const role = userInfo.role === "user" ? "admin" : "user";
    console.log(role);

    const userRoles = {
      role: role,
      userId: userInfo._id,
    };

    const userRole = await userRoleUpdate(userRoles);
    if (userRole.modifiedCount > 0) {
      toast.success("User Role Changed");
      router.refresh();
    }
  };

  // 2. ACTION: Remove user profile context
  const handleDelete = async(userId) => {
    const res = await userDelete(userId)
     console.log(res);
    if(res.deletedCount > 0){
        toast.success('User Delete Successful')
        router.refresh()
    }
    // console.log(res);


  };

  // 3. LOGIC: Search filter implementation
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  // 4. LOGIC: Sorting execution framework mirroring the HeroUI v3 specification
  const sortedUsers = useMemo(() => {
    if (!sortDescriptor.column) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      let first = a[sortDescriptor.column];
      let second = b[sortDescriptor.column];

      // Secondary fallback conditional comparison parsing for numeric vs string keys
      let cmp =
        (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [filteredUsers, sortDescriptor]);

  const handleSearchField = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (desc) => {
    setSortDescriptor(desc);
  };

  return (
    <div className="min-h-screen bg-default-50/40 p-4 sm:p-8 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* TOP INTRODUCTORY BRAND HERO GRID BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-default-100 dark:border-zinc-800/80 p-6 rounded-[24px] shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary-500/10 text-secondary-500 rounded-xl">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                Manage Platform Profiles
              </h1>
              <p className="text-xs text-default-400 font-medium">
                Review system credentials, assign administrative clearances, and
                view content counts.
              </p>
            </div>
          </div>

          <Input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={handleSearchField}
            startContent={<Search size={16} className="text-default-400" />}
            className="w-full sm:max-w-xs bg-default-100/70 hover:bg-default-200/50 dark:bg-zinc-800/50 border-none rounded-xl h-10 text-xs "
          />
        </div>

        {/* CONTAINER HOLDING THE COMPOUND RADIAL DESIGN TABLE PLATFORM CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Table className="border border-default-100 dark:border-zinc-900 bg-white dark:bg-zinc-900 shadow-sm rounded-[24px] overflow-hidden">
            <Table.ScrollContainer>
              <Table.Content
                aria-label="Platform managed user tables"
                sortDescriptor={sortDescriptor}
                onSortChange={handleSortChange}
              >
                <Table.Header>
                  <Table.Column isRowHeader allowsSorting id="name">
                    {({ sortDirection }) => (
                      <Table.SortableColumnHeader sortDirection={sortDirection}>
                        User Name
                      </Table.SortableColumnHeader>
                    )}
                  </Table.Column>
                  <Table.Column id="email">Email</Table.Column>
                  <Table.Column allowsSorting id="role">
                    {({ sortDirection }) => (
                      <Table.SortableColumnHeader sortDirection={sortDirection}>
                        Role Status
                      </Table.SortableColumnHeader>
                    )}
                  </Table.Column>
                  <Table.Column allowsSorting id="lessons">
                    {({ sortDirection }) => (
                      <Table.SortableColumnHeader sortDirection={sortDirection}>
                        Lessons Created
                      </Table.SortableColumnHeader>
                    )}
                  </Table.Column>
                  <Table.Column id="actions" align="end">
                    Management Actions
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {allUser.map((user) => (
                    <Table.Row
                      key={user._id}
                      className="hover:bg-default-50/50 dark:hover:bg-zinc-800/20 transition-colors border-b border-default-100/50 dark:border-zinc-800/40 last:border-0"
                    >
                      {/* USER CELL IDENTITY BLOCK */}
                      <Table.Cell>
                        <div className="flex items-center gap-3 py-1">
                          <Avatar
                            src={user.image}
                            size="sm"
                            className="ring-2 ring-default-100"
                          />
                          <span className="font-bold text-slate-800 dark:text-zinc-200 text-sm tracking-tight">
                            {user.name}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* EMAIL CELL BLOCK */}
                      <Table.Cell>
                        <span className="text-xs text-default-500 font-medium font-sans">
                          {user.email}
                        </span>
                      </Table.Cell>

                      {/* CHIP METADATA ROLE STATUS COLUMN */}
                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={
                            user.role === "admin" ? "secondary" : "default"
                          }
                          className={`font-bold text-[10px] uppercase tracking-wider h-5 ${
                            user.role === "admin"
                              ? "bg-purple-500/10 text-purple-500"
                              : "bg-neutral-500/10 text-default-500"
                          }`}
                        >
                          {user.role}
                        </Chip>
                      </Table.Cell>

                      {/* QUANTITY COUNTER INDICATOR CELL BLOCK */}
                      <Table.Cell>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-zinc-400 font-semibold">
                          <BookOpen size={13} className="text-default-400" />
                          <span>{user.lessons} lessons</span>
                        </div>
                      </Table.Cell>

                      {/* CONTEXTUAL MANAGEMENT ACTION BUTTON ACTIONS */}
                      <Table.Cell>
                        <div className="flex items-center justify-end gap-2">
                          <AnimatePresence mode="wait">
                            {user.role !== "admin" ? (
                              <Tooltip
                                content="Promote to Admin"
                                closeDelay={100}
                                color="secondary"
                                size="sm"
                                className="text-xs font-bold"
                              >
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="flat"
                                    color="secondary"
                                    className="h-8 w-8 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg"
                                    onPress={() => handlePromote(user)}
                                  >
                                    <ShieldCheck size={16} strokeWidth={2.2} />
                                  </Button>
                                </motion.div>
                              </Tooltip>
                            ) : (
                              <Tooltip
                                content="User is Root Admin"
                                closeDelay={100}
                                size="sm"
                                className="text-xs font-bold"
                              >
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="h-8 w-8 flex items-center justify-center text-emerald-500 bg-emerald-500/10 rounded-lg cursor-pointer"
                                >
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="flat"
                                    color="secondary"
                                    className="h-8 w-8 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg"
                                    onPress={() => handlePromote(user)}
                                  >
                                    <UserPlus size={15} />
                                  </Button>
                                </motion.div>
                              </Tooltip>
                            )}
                          </AnimatePresence>

                          <Tooltip
                            content="Purge Record"
                            closeDelay={100}
                            color="danger"
                            size="sm"
                            className="text-xs font-bold"
                          >
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                isIconOnly
                                size="sm"
                                variant="flat"
                                color="danger"
                                className="h-8 w-8 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg"
                                onPress={() => handleDelete(user._id)}
                              >
                                <Trash2 size={16} strokeWidth={2.2} />
                              </Button>
                            </motion.div>
                          </Tooltip>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>

            {/* EMPTY STATE CONTAINER CALLBACK HOOK */}
            {sortedUsers.length === 0 && (
              <div className="flex flex-col items-center justify-center p-12 text-center border-t border-default-100 dark:border-zinc-800">
                <div className="p-3 bg-default-100 dark:bg-zinc-800 rounded-full text-default-400 mb-3">
                  <AlertCircle size={24} />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-200">
                  No matching user accounts found
                </h3>
                <p className="text-xs text-default-400 max-w-xs mt-1">
                  Try customizing or shortening your current search parameters
                  to return active parameters.
                </p>
              </div>
            )}

            <Table.Footer className="border-t border-default-100 dark:border-zinc-800 p-4 flex items-center justify-between text-xs text-default-400 font-semibold bg-default-50/50 dark:bg-zinc-900/30">
              <span>Displaying {sortedUsers.length} total entries</span>
              <span className="text-[10px] uppercase tracking-wider bg-default-200/60 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                Admin Clearances Active
              </span>
            </Table.Footer>
          </Table>
        </motion.div>
      </div>
    </div>
  );
}
