setup:
	docker-compose up -d

api-dev: 
	docker exec -it temp-api-1 npm run start:dev

client-dev:
	docker exec -it client npm run dev

reset:
	docker-compose down
	make setup
	make run-seed

run-seed:
	docker exec temp-api-1 npx prisma migrate reset --force
	docker exec -it temp-api-1 npm run seed