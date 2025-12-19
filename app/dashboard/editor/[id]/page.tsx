'use client'

import { useEffect, useRef } from 'react'
import { createDocAuthSystem } from '@nutrient-sdk/document-authoring'
import { supabase } from '@/lib/supabase'
import { redirect, useParams } from 'next/navigation'
import {
	Document,
	Header,
	ImageRun,
	Packer,
	Paragraph,
    TextRun,
} from 'docx'

export default function Editor() {
	const divRef = useRef<HTMLDivElement>(null)
	const { id } = useParams()

	useEffect(() => {
		const setEditor = async () => {
			const { data } = await supabase
				.from('letter_number')
				.select('created_at, organization_id, description, letter_number')
				.eq('id', id)
				.single()
			if (!data) redirect('/dashboard')
			const { data: organization } = await supabase
				.from('organization')
				.select('name, logo, address, telephone, email, website')
				.eq('id', data.organization_id)
				.single()
			const { data: logo } = supabase.storage
				.from('letter')
				.getPublicUrl(`public/${organization?.logo}`)
			const logoResponse = await fetch(logo.publicUrl)
			const logoBuffer = await logoResponse.arrayBuffer()
			const docAuthSystem = await createDocAuthSystem()
			const doc = new Document({
				sections: [
					{
						headers: {
							default: new Header({
								children: [
									new Paragraph({
										children: [new TextRun({ text: organization?.name, bold: true })],
										alignment: 'center',
									}),
									new Paragraph({
										text: organization?.address,
										alignment: 'center',
									}),
									new Paragraph({
										text: `Telp. ${organization?.telephone} | E-mail: ${organization?.email} | Web: ${organization?.website}`,
										alignment: 'center',
									}),
									new Paragraph({
										children: [
											new ImageRun({
												data: logoBuffer,
												type: organization?.logo.split('.')[
													organization?.logo.split('.').length - 1
												],
												transformation: {
													width: 100,
													height: 100,
												},
												floating: {
													horizontalPosition: {
														relative: 'margin',
														offset: 100000,
													},
													verticalPosition: {
														relative: 'page',
														offset: 100000,
													},
												},
											}),
										],
									}),
								],
							}),
						},
						children: [
							new Paragraph({
								alignment: 'right',
								text: new Date(data.created_at).toLocaleDateString('id-ID', {
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								}),
							}),
							new Paragraph({
								text: `Nomor       : ${data.letter_number}`,
							}),
							new Paragraph({
								text: `Perihal       : ${data.description}`,
							}),
							new Paragraph({
								text: 'Lampiran   : -',
							}),
						],
					},
				],
			})
			const docAuth = await docAuthSystem.importDOCX(await Packer.toBlob(doc))
			const editor = await docAuthSystem.createEditor(
				divRef.current as HTMLDivElement,
				{
					document: docAuth,
				}
			)
		}
		setEditor()
	}, [])

	return (
		<div
			ref={divRef}
			className='relative h-screen scrollbar-hide overflow-y-scroll'
		></div>
	)
}
