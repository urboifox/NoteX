import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import icons from '@/lib/icons'
import React from 'react'

export default function SessionContentLoading() {
  return (
          <div className="flex-1 pb-5 flex justify-between flex-col gap-10 items-center">
              <div className="flex-1 flex-col gap-10 flex items-center justify-center">
                <Input
                    name="sessionName"
                    placeholder="Session Name"
                    className="transition-all duration-200"
                />

                      <div
                          className="rounded-full opacity-50 cursor-not-allowed relative aspect-square w-40 flex items-center justify-center bg-white overflow-hidden border-white border text-4xl"
                      >
                        <span className='text-black'>
                            {icons.play}
                        </span>
                      </div>

                  <div className="flex items-center gap-5">
                          <Button disabled >
                              {icons.reset}
                          </Button>
                        <Button disabled >
                            {icons.stop}
                        </Button>
                  </div>
              </div>

              <time
                  className={"font-number text-white/50 select-none text-2xl font-light transition-colors duration-200"}
              >
                  {'00:00:00'}
              </time>
          </div>
  )
}
