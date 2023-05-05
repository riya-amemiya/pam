import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const roleData: Prisma.RoleCreateInput[] = [
	{
		name: "USER",
	},
	{
		name: "ADMIN",
	},
	{
		name: "STUDENT",
	},
	{
		name: "TEACHER",
	},
];

const seed = async () => {
	for (const data of roleData) {
		const role = await prisma.role.create({
			data,
		});
		console.log(`Created role with id: ${role.id}`);
	}
};

const main = async () => {
	console.log("Start seeding ...");

	await seed();

	console.log("Seeding finished.");
};

// 処理開始
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
