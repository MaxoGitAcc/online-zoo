import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  UserProfile,
  Pet,
  Feedback,
  Camera,
  DonationRequest,
  DonationResponse,
} from "../types/types";

const BASE_URL = "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod";

// ****  Helper **** //
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// ****  Pets**** //****
export async function getPets(): Promise<Pet[]> {
  return request<Pet[]>("/pets");
}

export async function getPetById(id: number): Promise<Pet> {
  return request<Pet>(`/pets/${id}`);
}

// ****  Feedback **** //
export async function getFeedback(): Promise<Feedback[]> {
  return request<Feedback[]>("/feedback");
}

// ****  Cameras **** //
export async function getCameras(): Promise<Camera[]> {
  return request<Camera[]>("/cameras");
}

// ****  Auth **** //
export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getUserProfile(): Promise<UserProfile> {
  return request<UserProfile>("/auth/profile");
}

// ****  Donations **** //
export async function submitDonation(data: DonationRequest): Promise<DonationResponse> {
  return request<DonationResponse>("/donations", {
    method: "POST",
    body: JSON.stringify(data),
  });
}