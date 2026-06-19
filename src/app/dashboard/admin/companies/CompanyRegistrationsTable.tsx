"use client";

import { useMemo, useState } from "react";
import { Pagination, Table, Button, toast } from "@heroui/react";
import { CompanyData, CompanyStatus } from "@/utils/types/DashboardTypes";
import Image from "next/image";
import { updateCompany } from "@/lib/api/company";

// Map status for colors and labels
const STATUS_CONFIG: Record<CompanyStatus, { color: string; label: string }> = {
  approved: { color: "emerald", label: "Approved" },
  pending: { color: "amber", label: "Pending" },
  rejected: { color: "rose", label: "Rejected" },
};

const ROWS_PER_PAGE = 5; // To match the sample image

interface CompanyRegistrationsTableProps {
  companies: CompanyData[];
}

export function CompanyRegistrationsTable({
  companies,
}: CompanyRegistrationsTableProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(companies.length / ROWS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return companies.slice(start, start + ROWS_PER_PAGE);
  }, [page, companies]);

  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, companies.length);

  const renderStatus = (status: CompanyStatus) => {
    const config = STATUS_CONFIG[status];
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-sm font-medium text-${config?.color}-500`}
      >
        <span className={`size-1.5 rounded-full bg-${config?.color}-500`} />
        {config?.label}
      </span>
    );
  };

  // Define action handlers that just console log for now

  const handleApprove = async (id: string) => {
    const result = await updateCompany(id, { status: "approved" });
    if (result.modifiedCount) {
      toast.success("Company has been approved");
      console.log(`Approving company: ${id}`);
    }
  };

  const handleReject = async (id: string) => {
    const result = await updateCompany(id, { status: "rejected" });
    if (result.modifiedCount) {
      toast.success("Company has been rejected");
      console.log(`Rejecting company: ${id}`);
    }
  };

  return (
    <Table className="bg-zinc-950 rounded-lg p-2 ">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Company registrations table"
          className="min-w-[1000px] text-zinc-100"
        >
          <Table.Header className="h-14">
            <Table.Column className="font-semibold text-zinc-400 py-4">
              Company Name
            </Table.Column>
            <Table.Column className="font-semibold text-zinc-400 py-4">
              Recruiter Email
            </Table.Column>
            <Table.Column className="font-semibold text-zinc-400 py-4">
              Industry
            </Table.Column>
            <Table.Column className="font-semibold text-zinc-400 py-4">
              Status
            </Table.Column>
            <Table.Column className="font-semibold text-zinc-400 py-4">
              Job Count
            </Table.Column>
            <Table.Column className="font-semibold text-zinc-400 py-4">
              Date Submitted
            </Table.Column>
            <Table.Column className="font-semibold text-zinc-400 py-4">
              Actions
            </Table.Column>
          </Table.Header>
          <Table.Body
            items={paginatedItems}
            className="divide-y divide-zinc-800 mt-2"
          >
            {(company) => (
              <Table.Row id={company._id}>
                <Table.Cell className="py-4">
                  <div className="flex items-center gap-3">
                    {/* The container MUST be relative for layout="fill" to work properly */}
                    <div className="relative size-10 flex items-center justify-center rounded-lg bg-zinc-800 text-zinc-100 font-bold text-lg overflow-hidden border border-zinc-700/50">
                      {company.companyLogo ? (
                        <Image
                          src={company.companyLogo}
                          alt={`${company.formName} logo`}
                          fill
                          sizes="40px" // Tells Next.js optimal generation size for a size-10 tailwind box
                          className="object-cover"
                        />
                      ) : (
                        // Fallback initials if no image URL is provided
                        <span>{company.formName?.charAt(0) || "C"}</span>
                      )}
                    </div>
                    <span className="font-medium text-zinc-200">
                      {company.formName}
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell className="text-zinc-300 font-medium py-4">
                  {company?.recruiterEmail}
                </Table.Cell>
                <Table.Cell className="py-4">
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300 font-medium border border-zinc-700">
                      {company.formIndustry}
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell className="py-4">
                  {renderStatus(company?.status)}
                </Table.Cell>
                <Table.Cell >
                  <span className="px-3 py-1.5 font-medium bg-zinc-800 rounded-full border border-zinc-700 text-zinc-300">
                    {company?.jobCount}
                  </span>
                </Table.Cell>
                <Table.Cell className="text-zinc-300 py-4">
                  {company?.createdAt?.split("T")[0]}
                </Table.Cell>
                <Table.Cell className="py-4">
                  <div className="flex gap-2 justify-end">
                    {/* Only show Approve for Pending and Rejected companies */}
                    {company.status !== "approved" && (
                      <Button
                        size="sm"
                        className="rounded border-emerald-500/20 text-white font-semibold bg-emerald-600 hover:bg-emerald-500/50 px-4"
                        onClick={() => handleApprove(company._id)}
                      >
                        Approve
                      </Button>
                    )}
                    {/* Only show Reject for Pending and Approved companies */}
                    {company.status !== "rejected" && (
                      <Button
                        size="sm"
                        className="rounded border-rose-500/20 text-white bg-rose-600 font-semibold hover:bg-rose-500/50 px-4"
                        onClick={() => handleReject(company._id)}
                      >
                        Reject
                      </Button>
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer className="bg-zinc-950 border-t border-zinc-800 mt-2 px-6 py-4 rounded-b-lg">
        <Pagination size="sm">
          <Pagination.Summary className="text-sm font-normal text-zinc-400">
            Showing{" "}
            <span className="font-medium text-zinc-100">
              {start}-{end}
            </span>{" "}
            of{" "}
            <span className="font-medium text-zinc-100">
              {companies.length}
            </span>{" "}
            companies
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
                className="bg-zinc-800 text-zinc-300 font-semibold rounded hover:bg-zinc-700"
              >
                <Pagination.PreviousIcon />
              </Pagination.Previous>
            </Pagination.Item>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Pagination.Item key={p}>
                <Pagination.Link
                  isActive={p === page}
                  onPress={() => setPage(p)}
                >
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
                onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="bg-zinc-800 text-zinc-300 font-semibold rounded hover:bg-zinc-700"
              >
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
  );
}
