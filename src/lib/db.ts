/**
 * Database connection placeholder
 * Currently using in-memory storage for demo purposes
 * To add database support, configure DATABASE_URL and uncomment Prisma integration
 */

export interface DbContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

// Dummy export for type compatibility
export const db = {
  contactMessage: {
    create: async (data: { data: Omit<DbContactMessage, 'id' | 'createdAt'> }) => {
      return {
        id: "demo-" + Date.now(),
        ...data.data,
        createdAt: new Date(),
      };
    },
  },
};

export default db;
