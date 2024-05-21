'use client';
import React from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import icons from '@/lib/icons'

export default function TodosAdd() {
  return (
      <form className="flex items-center w-full gap-3">
          <Input
              name="title"
              placeholder="New Todo..."
              className="w-full"
              inputClassName="bg-transparent placeholder:font-normal"
          />
          <Button className="text-xl">{icons.plus}</Button>
      </form>
  );
}
