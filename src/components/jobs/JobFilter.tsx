import React from "react";
import { FiSearch, FiChevronDown, FiCheck } from "react-icons/fi";
import {
  Select,
  TextField,
  InputGroup,
  Checkbox,
  ListBox,
  Label,
} from "@heroui/react";
import { JobFilters } from "@/utils/types/JobTypes";

interface JobFilterBarProps {
  filters: JobFilters;
  onFilterChange: (newFilters: Partial<JobFilters>) => void;
}

export default function JobFilterBar({
  filters,
  onFilterChange,
}: JobFilterBarProps) {
  const categories = [
    "All",
    "technology",
    "marketing",
    "design",
    "finance",
    "sales",
  ];

  const jobTypes = [
    "All",
    "full-time",
    "part-time",
    "contract",
    "freelance",
  ];

  const formatLabel = (val: string) =>
    val === "All"
      ? val
      : val.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="w-full bg-[#18181b] p-4 rounded-2xl shadow-lg border border-zinc-800 flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
      {/* Search Input */}
      <div className="w-full md:w-1/3">
        <TextField>
          <Label className="sr-only">Search Jobs</Label>

          <InputGroup className="bg-[#27272a] border-none rounded-xl text-white">
            <InputGroup.Prefix className="pl-3 text-zinc-400">
              <FiSearch />
            </InputGroup.Prefix>

            <InputGroup.Input
              value={filters.searchQuery}
              onChange={(e) =>
                onFilterChange({ searchQuery: e.target.value })
              }
              placeholder="Search by job title..."
              className="bg-transparent border-none text-sm placeholder:text-zinc-500 focus:ring-0 py-2.5 w-full"
            />
          </InputGroup>
        </TextField>
      </div>

      {/* Filters Container */}
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-1 md:justify-end items-start sm:items-center">
        {/* Category Select */}
        <div className="w-full sm:w-40">
          <Select
            value={filters.category}
            onChange={(val) => {
              if (val) {
                onFilterChange({ category: String(val) });
              }
            }}
            placeholder="Category"
          >
            <Label className="sr-only">Category</Label>

            <Select.Trigger className="bg-[#27272a] border-none rounded-xl text-sm text-white w-full flex justify-between items-center px-3 py-2.5">
              <Select.Value />

              <Select.Indicator className="text-zinc-400">
                <FiChevronDown />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Popover className="bg-[#27272a] border border-zinc-700 rounded-xl shadow-xl mt-1">
              <ListBox className="p-1">
                {categories.map((cat) => (
                  <ListBox.Item
                    key={cat}
                    id={cat}
                    textValue={formatLabel(cat)}
                    className="p-2 hover:bg-[#3f3f46] rounded-lg cursor-pointer text-sm text-white"
                  >
                    <Label>{formatLabel(cat)}</Label>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Job Type Select */}
        <div className="w-full sm:w-40">
          <Select
            value={filters.jobType}
            onChange={(val) => {
              if (val) {
                onFilterChange({ jobType: String(val) });
              }
            }}
            placeholder="Job Type"
          >
            <Label className="sr-only">Job Type</Label>

            <Select.Trigger className="bg-[#27272a] border-none rounded-xl text-sm text-white w-full flex justify-between items-center px-3 py-2.5">
              <Select.Value />

              <Select.Indicator className="text-zinc-400">
                <FiChevronDown />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Popover className="bg-[#27272a] border border-zinc-700 rounded-xl shadow-xl mt-1">
              <ListBox className="p-1">
                {jobTypes.map((type) => (
                  <ListBox.Item
                    key={type}
                    id={type}
                    textValue={formatLabel(type)}
                    className="p-2 hover:bg-[#3f3f46] rounded-lg cursor-pointer text-sm text-white"
                  >
                    <Label>{formatLabel(type)}</Label>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Remote Checkbox */}
        <div className="flex items-center pl-2">
          <Checkbox
            isSelected={filters.isRemote}
            onChange={(isSelected) =>
              onFilterChange({ isRemote: isSelected })
            }
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Checkbox.Control className="w-5 h-5 rounded border-2 border-zinc-500 group-data-[state=checked]:bg-[#f472b6] group-data-[state=checked]:border-[#f472b6] flex items-center justify-center transition-colors">
              <Checkbox.Indicator className="text-[#18181b]">
                <FiCheck size={14} strokeWidth={3} />
              </Checkbox.Indicator>
            </Checkbox.Control>

            <Checkbox.Content>
              <Label className="text-sm font-medium text-zinc-300 cursor-pointer select-none">
                Remote Only
              </Label>
            </Checkbox.Content>
          </Checkbox>
        </div>
      </div>
    </div>
  );
}