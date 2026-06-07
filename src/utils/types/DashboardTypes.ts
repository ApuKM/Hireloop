import React from "react";

export interface StatItem {
    icon: React.ReactNode;
    label: string;
    value: number | string;
}

export interface StatSectionProps {
    stats: StatItem[];
    className?: string;
}