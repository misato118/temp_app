import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
 
type Company = {
  id: number;
  name: string;
  email: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  logoURL: string;
  employees: Employee[]
}

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  imageURL: string;
  company: Company;
  companyId: number;
}
 
export const getServerSideProps = (async () => {
  // Fetch data from external API
  const { data } = await fetch(`${process.env.GRAPHQL_API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          employee {
            id
            firstName
            lastName
            birthDate
            email
            createdAt
            updatedAt
            imageURL
            company {
              name
            }
          }
        }
      `,
    }),
    next: { revalidate: 10 }
  })
  .then((res) => res.json());

  let employees = data?.employee;

  // Pass data to the page via props
  return { props: { employees } }
}) satisfies GetServerSideProps<{ employees: Employee[] }>
 
export default function Page ({
  employees,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <div>
        <table className="hidden min-w-full text-gray-900 md:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">ID</th>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">firstName</th>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">lastName</th>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">birthDate</th>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">email</th>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">createdAt</th>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">updatedAt</th>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">imageURL</th>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">company</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {employees.map((employee: Employee) => {
              return (
                <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">{employee.id}</td>
                  <td className="whitespace-nowrap px-3 py-3">{employee.firstName}</td>
                  <td className="whitespace-nowrap px-3 py-3">{employee.lastName}</td>
                  <td className="whitespace-nowrap px-3 py-3">{employee.birthDate.toLocaleString()}</td>
                  <td className="whitespace-nowrap px-3 py-3">{employee.email}</td>
                  <td className="whitespace-nowrap px-3 py-3">{employee.createdAt.toLocaleString()}</td>
                  <td className="whitespace-nowrap px-3 py-3">{employee.updatedAt.toLocaleString()}</td>
                  <td className="whitespace-nowrap px-3 py-3">{employee.imageURL}</td>
                  <td className="whitespace-nowrap px-3 py-3">{employee.company.name}</td>
                </tr>
              );
            })
            }
          </tbody>
        </table>
      </div>
    </main>
  );
}