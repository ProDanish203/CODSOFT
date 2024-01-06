import { Link } from "react-router-dom"

export const JobCard = ({data}) => {
  const {_id, title, desc, author} = data;
  return (
    <>
    <div className='bg-bg rounded-md shadow-md p-4 max-w-[350px]'>
      <div className='relative w-full'>
      </div>

      <div className='mb-2'>
        <h2 className='text-para text-2xl font-extrabold'>{title}</h2>
        <p className='text-sm text-neutral-600 mt-1'>Listed by: {author.name}</p>
        <p className='text-neutral-800 mt-2 max-md:text-sm'>{desc.substring(0, 150)}..</p>
      </div>

      <div className='mt-4 block'>
        <Link to={`/job?id=${_id}`} className='bg-accent md:text-lg font-bold block text-center w-full text-white py-2 rounded-md mt-2'>
          View Details
        </Link>
      </div>
    </div>
    </>
    )
}
