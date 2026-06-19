"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Button, Pagination, Table, toast } from "@heroui/react";
import { UserData } from "@/utils/types/DashboardTypes";
import { updateUserRole } from "@/lib/api/users";
import {
  AlertDialog
} from "@heroui/react";

const ROWS_PER_PAGE = 4;

const columns = [
  { id: "user", name: "User Name" },
  { id: "email", name: "Email Address" },
  { id: "role", name: "Role" },
  { id: "createdAt", name: "Join Date" },
  { id: "status", name: "Status" },
  { id: "actions", name: "Actions" },
] as const;

function roleBadge(role: string | undefined) {
  switch (role) {
    case "recruiter":
      return "bg-zinc-100 text-zinc-900 border-zinc-200";
    case "admin":
      return "bg-indigo-500/15 text-indigo-300 border-indigo-500/20";
    default:
      return "bg-zinc-800 text-zinc-300 border-zinc-700";
  }
}

function statusBadge(banned: boolean | null) {
  return banned
    ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
}

function formatDate(dateValue: string | Date) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function UsersListTable({ users }: { users: UserData[] }) {
  const [roleDialog, setRoleDialog] = useState<{
    isOpen: boolean;
    userId: string;
    userName: string;
    role: "seeker" | "recruiter" | "admin";
  }>({
    isOpen: false,
    userId: "",
    userName: "",
    role: "seeker",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(users.length / ROWS_PER_PAGE));

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return users.slice(start, start + ROWS_PER_PAGE);
  }, [page, users]);

  const start = users.length === 0 ? 0 : (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, users.length);

  // Enforce the types directly in the function arguments
  const handleRoleChange = async () => {
    try {
      setIsUpdating(true);

      await updateUserRole(roleDialog.userId, roleDialog.role);

      toast.success(`${roleDialog.userName} is now a ${roleDialog.role}`);

      setRoleDialog({
        isOpen: false,
        userId: "",
        userName: "",
        role: "seeker",
      });
    } catch (error) {
      console.error(error);
      toast("Failed to update role");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-lg shadow-black/20">
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Users list table"
            className="min-w-[1100px] text-zinc-100"
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column className="py-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>

            <Table.Body items={paginatedItems}>
              {(user) => (
                <Table.Row
                  id={user?.id}
                  className="border-b border-zinc-800/80 transition-colors hover:bg-zinc-900/60"
                >
                  <Table.Cell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold text-zinc-100">
                        {user?.image ? (
                          <Image
                            src={user?.image}
                            alt={user?.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          <span>
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="truncate font-medium text-zinc-100">
                          {user.name}
                        </div>
                        <div className="truncate text-xs text-zinc-500">
                          ID: {user.id}
                        </div>
                      </div>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="py-4 text-sm text-zinc-300">
                    {user?.email}
                  </Table.Cell>

                  <Table.Cell className="py-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize ${roleBadge(
                        user.role,
                      )}`}
                    >
                      {user.role}
                    </span>
                  </Table.Cell>

                  <Table.Cell className="py-4 text-sm text-zinc-300">
                    {formatDate(user?.createdAt)}
                  </Table.Cell>

                  <Table.Cell className="py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${statusBadge(
                        user.banned,
                      )}`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          user.banned ? "bg-rose-400" : "bg-emerald-400"
                        }`}
                      />

                      {user.banned ? "Suspended" : "Active"}
                    </span>
                  </Table.Cell>

                  <Table.Cell className="py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="rounded-md border border-zinc-700 bg-zinc-800 px-3 font-medium text-zinc-200 hover:bg-zinc-700"
                        onPress={() =>
                          setRoleDialog({
                            isOpen: true,
                            userId: user.id,
                            userName: user.name,
                            role: "seeker",
                          })
                        }
                      >
                        Make Seeker
                      </Button>

                      <Button
                        size="sm"
                        className="rounded-md border border-zinc-200 bg-zinc-100 px-3 font-medium text-zinc-900 hover:bg-zinc-200"
                        onPress={() =>
                          setRoleDialog({
                            isOpen: true,
                            userId: user.id,
                            userName: user.name,
                            role: "recruiter",
                          })
                        }
                      >
                        Make Recruiter
                      </Button>

                      {user?.banned ? (
                        <Button
                          size="sm"
                          className="rounded-md border border-emerald-500/20 bg-emerald-600 px-3 font-medium text-white hover:bg-emerald-500"
                          // onPress={() => handleAction(`Activated ${user.name}`)}
                        >
                          Activate
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="rounded-md border border-rose-500/20 bg-rose-600 px-3 font-medium text-white hover:bg-rose-500"
                          // onPress={() => handleAction(`Suspended ${user.name}`)}
                        >
                          Suspend
                        </Button>
                      )}

                      <Button
                        size="sm"
                        className="rounded-md border border-zinc-700 bg-transparent px-3 font-medium text-zinc-300 hover:bg-zinc-900"
                        // onPress={() => handleAction(`Deleted ${user.name}`)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        <Table.Footer className="border-t border-zinc-800 bg-zinc-950 px-4 py-4">
          <Pagination size="sm">
            <Pagination.Summary className="text-sm text-zinc-400">
              Showing{" "}
              <span className="font-medium text-zinc-100">
                {start}-{end}
              </span>{" "}
              of{" "}
              <span className="font-medium text-zinc-100">{users.length}</span>{" "}
              users
            </Pagination.Summary>

            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-md bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                >
                  <Pagination.PreviousIcon />
                </Pagination.Previous>
              </Pagination.Item>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === page}
                    onPress={() => setPage(p)}
                    className="rounded-md"
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ))}

              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-md bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                >
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      </Table>
      <AlertDialog
        isOpen={roleDialog.isOpen}
        onOpenChange={(open) =>
          setRoleDialog((prev) => ({
            ...prev,
            isOpen: open,
          }))
        }
      >
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="border border-zinc-800 bg-zinc-950 text-zinc-100">
              <AlertDialog.Header>
                <AlertDialog.Icon />
                <AlertDialog.Heading>Change User Role</AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body>
                Are you sure you want to change the role of{" "}
                <span className="font-semibold">{roleDialog.userName}</span> to{" "}
                <span className="font-semibold capitalize">
                  {roleDialog.role}
                </span>
                ?
              </AlertDialog.Body>

              <AlertDialog.Footer>
                <Button
                  variant="outline"
                  onPress={() =>
                    setRoleDialog((prev) => ({
                      ...prev,
                      isOpen: false,
                    }))
                  }
                >
                  Cancel
                </Button>

                <Button
                  variant="danger-soft"
                  isPending={isUpdating}
                  onPress={handleRoleChange}
                >
                  Confirm
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
}
