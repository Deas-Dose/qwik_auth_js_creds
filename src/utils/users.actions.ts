import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { sessions, users } from "../../drizzle/schema";

export const getUserFromDb = async (email: string, password: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    if (user.password !== password) {
      return {
        success: false,
        message: "Incorrect password",
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const existedUsed = await getUserFromDb(email, password);
    if (existedUsed.success) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const [insertedUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password,
      })
      .returning({
        id: users.id,
        email: users.email,
      });

    return {
      success: true,
      data: insertedUser,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getUserSessions = async (userId: string) => {
    const userSessions = await db.query.sessions.findMany({
      where: eq(sessions.userId, userId),
    });
  
    if (!userSessions) return false;
  
    return true;
  };