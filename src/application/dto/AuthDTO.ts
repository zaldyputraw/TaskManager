// DTO for incoming data (Request)
export interface SignupDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

// DTO for outgoing data (Response)
export interface AuthResponseDTO {
  token: string;
  userId: number;
  email: string;
  name: string | null;
}
