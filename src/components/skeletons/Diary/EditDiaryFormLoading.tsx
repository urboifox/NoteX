import React from 'react'
import Skeleton from 'react-loading-skeleton';
import Button from '../../common/Button';

export default function EditDiaryFormLoading() {
  return (
      <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
              Brief
              <Skeleton height={40} />
          </div>

          <div className="flex flex-col gap-2">
              Content
              <Skeleton height={300} />
          </div>
          <Button className="w-full">Add</Button>
      </div>
  );
}
