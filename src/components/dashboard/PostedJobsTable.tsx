"use client";

import { JobFormValues } from "@/utils/types/DashboardTypes";
import {Pagination, Table} from "@heroui/react";
import {useMemo, useState} from "react";

const columns = [
  {id: "title", name: "Title"},
  {id: "category", name: "Category"},
  {id: "jobType", name: "Job-Type"},
  {id: "location", name: "Location"},
  {id: "deadline", name: "Deadline"},
];


const ROWS_PER_PAGE = 4;

export function PostedJobsTable({companyJobs}: {companyJobs: JobFormValues[]}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(companyJobs.length / ROWS_PER_PAGE);
  const pages = Array.from({length: totalPages}, (_, i) => i + 1);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;

    return companyJobs.slice(start, start + ROWS_PER_PAGE);
  }, [page, companyJobs]);

  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, companyJobs.length);

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Table with pagination" className="min-w-[600px]">
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column isRowHeader={column.id === "title"}>{column.name}</Table.Column>
            )}
          </Table.Header>
          <Table.Body items={paginatedItems} >
            {(job) => (
              <Table.Row id={job.title}>
                <Table.Collection items={columns}>
                  {(column) => <Table.Cell>{job[column.id as keyof typeof job]}</Table.Cell>}
                </Table.Collection>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer>
        <Pagination size="sm">
          <Pagination.Summary>
            {start} to {end} of {companyJobs.length} results
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
                <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
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