/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/UF1GrtxcLqw
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
} 
*/
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Checkbox } from '@nextui-org/checkbox'
import { typeProps } from '@/types/marketplaces/marketplaces'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import React from 'react'
import { toast } from 'sonner'
import StepperComponent from './steper'
import FilePonds from './filepond'

export function CadastrarMarketplace(props: typeProps) {





  return (
    <div className="flex flex-col items-center mt-8 max-h-screen bg-gray-200 p-4">
      <Card className="w-full max-w-7xl bg-white ">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-center">
            Cadastrar MarketPlace (Zoop)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" hidden xl:flex md:flex lg:flex w-full border-b items-center  justify-center lg:mb-6">
            <StepperComponent stepsData={props.stepsData} activeStep={props.activeStep} />
          </div>
          <form className="space-y-4">
            {props.activeStep === 0 ? (
              <>
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Input
                      onChange={props.onChange}
                      name='nome'
                      value={props.data.nome}
                      placeholder={'Nome'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={props.data.zoopMarketplaceId}
                      onChange={props.onChange}
                      name='zoopMarketplaceId'
                      placeholder={'Zoop Marketplace Id'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      onChange={props.onChange}
                      name='dominio'
                      value={props.data.dominio}
                      placeholder={'Dominio'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={props.data.sellerId}
                      onChange={props.onChange}
                      name='sellerId'
                      placeholder={'Seller Id'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={props.data.website}
                      onChange={props.onChange}
                      name='website'
                      placeholder={'Website'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      value={props.data.zpk}
                      onChange={props.onChange}
                      name='zpk'
                      placeholder={'zpk'}
                      required={true}
                      variant="underlined"
                      labelPlacement="inside"
                    />
                  </div>
                </div>
                <div className="p-4 pl-0  flex flex-col justify-start lg:flex lg:flex-row gap-4 ">
                  <div className="flex items-center lg:justify-center justify-start space-x-2 ">
                    <Checkbox name='cobrancaPorTransacao' onChange={props.onChange}>Cobrança por transação</Checkbox>
                  </div>
                  <div className="flex items-center lg:justify-center space-x-2 justify-start">
                    <Checkbox name='taxaAdministrativa' onChange={props.onChange}>Taxa Administrativa</Checkbox>
                  </div>
                  <div className="flex items-center lg:justify-center space-x-2 justify-start">
                    <Checkbox name='carne' onChange={props.onChange}>Carnê</Checkbox>
                  </div>
                </div>
              </>
            ) : null}
            {props.activeStep === 1 ? (
              <Input placeholder="teste" onChange={props.onChange} name='color' type="color" />
            ) : null}
            {props.activeStep === 2 ? (<>
              <div className='border-2 lg:grid-cols-3 lg:grid h-full'>
                <div className='h-full'>
                  <h1 className='flex justify-center items-center font-bold'>Logo</h1>
                  <FilePonds titulo='teste bro' />
                </div>
                <div className='h-full'>
                  <h1 className='flex justify-center items-center font-bold'>Logo</h1>
                  <FilePonds titulo='teste bro' />
                </div>
                <div className='h-full'>
                  <h1 className='flex justify-center items-center font-bold'>Logo</h1>

                  <FilePonds titulo='teste bro' />
                </div>
              </div>
              <Button >teste</Button>
            </>
            ) : null}
            {props.activeStep === 3 ? <p>step 4</p> : null}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center lg:justify-end space-x-4">
          <Button
            variant="bordered"
            radius="sm"
            color="primary"
            isLoading={props.isLoading}
            onClick={props.handlePrevStep}
          >
            Voltar
          </Button>
          <Button
            isLoading={props.isLoading}
            onClick={props.onClickNext}
            variant="bordered"
            radius="sm"
            color="primary"
          >
            Próximo
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
