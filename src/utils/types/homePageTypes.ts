
export interface StatCard {
    id: number;
    icon: React.ReactNode;
    value: string;
    label: string
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  imageUrl?: string;
  role: "seeker" | "recruiter";
  plan: string;
}

export interface LoginFormInputs {
  email: string;
  password: string;
}