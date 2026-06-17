"use client";

import { RawApplicantData } from "@/utils/types/JobTypes";
import { Pagination, Table } from "@heroui/react";
import { useMemo, useState } from "react";


// 2. Updated Columns IDs matching simple property schemas
const columns = [
  { id: "createdAt", name: "Date Applied" },
  { id: "jobId", name: "Job ID" },
  { id: "applicantEmail", name: "Email" },
  { id: "coverLetter", name: "Cover Letter" },
  { id: "links", name: "Links" },
];

const ROWS_PER_PAGE = 4;

export function SeekerApplicationsTable({
  applications,
}: {
  applications: RawApplicantData[];
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(applications.length / ROWS_PER_PAGE);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return applications.slice(start, start + ROWS_PER_PAGE);
  }, [page, applications]);

  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, applications.length);

  // 3. Robust rendering function to intercept complex MongoDB objects safely
  const renderCell = (application: RawApplicantData, columnId: React.Key) => {
    switch (columnId) {
      case "createdAt":
        return application.createdAt
          ? new Date(application.createdAt).toLocaleString()
          : "N/A";
      case "jobId":
        return `...${application.jobId.slice(-6)}`;
      case "applicantEmail":
        return application.applicantEmail;
      case "coverLetter":
        return (
          <span
            className="truncate max-w-[200px] inline-block"
            title={application.coverLetter}
          >
            {application.coverLetter}
          </span>
        );
      case "links":
        return (
          <div className="flex gap-3 text-sm">
            <a
              href={application.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Resume
            </a>
            <a
              href={application.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Portfolio
            </a>
            <a
              href={application.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Applications table with pagination"
          className="min-w-[800px]"
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column isRowHeader={column.id === "jobId"}>
                {column.name}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={paginatedItems}>
            {(application) => (
              /* FIX: Extract the string literal from the nested Mongo object */
              <Table.Row id={application._id}>
                <Table.Collection items={columns}>
                  {(column) => (
                    <Table.Cell>
                      {renderCell(application, column.id)}
                    </Table.Cell>
                  )}
                </Table.Collection>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>

      <Table.Footer>
        <Pagination size="sm">
          <Pagination.Summary>
            {applications.length > 0 ? start : 0} to {end} of{" "}
            {applications.length} results
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              >
                <Pagination.PreviousIcon />
                Prev
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((p) => (
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
                isDisabled={page === totalPages || totalPages === 0}
                onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
  );
}
