import { Album, Lightbulb } from "lucide-react";

import MarkdownRenderer from "@/components/markdown-renderer";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Problem } from "@/lib/problem/types";

import DifficultyBadge from "./difficulty-badge";

export default function ProblemDetailsPanel({ problem }: { problem: Problem }) {
	return (
		<ScrollArea className="max-w-prose flex-1 rounded-md border">
			<div className="p-4">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col justify-start gap-2">
						<h1 className="text-2xl font-semibold">
							{problem.title}
						</h1>
						<div className="flex flex-row items-center justify-start gap-2">
							<DifficultyBadge difficulty={problem.difficulty} />
						</div>
					</div>
					<MarkdownRenderer text={problem.description} />
					{problem.examples.length > 0 && (
						<ul className="flex flex-col items-start justify-start gap-6">
							{problem.examples.map((example, index) => (
								<li key={index}>
									<p className="font-semibold text-muted-foreground">
										Example {index + 1}
									</p>
									<div className="mt-2 border-l-2 pl-4">
										<MarkdownRenderer
											text={`Input: \`${example.input}\``}
										/>
										<MarkdownRenderer
											text={`Output: \`${example.output}\``}
										/>
										{example.explanation && (
											<MarkdownRenderer
												text={`Explanation: ${example.explanation}`}
											/>
										)}
									</div>
								</li>
							))}
						</ul>
					)}
					{problem.constraints.length > 0 && (
						<div className="flex flex-col items-start justify-start gap-2">
							<p className="font-semibold">Constraints</p>
							<ul className="flex list-inside list-disc flex-col items-start justify-start gap-2">
								{problem.constraints.map(
									(constraint, index) => (
										<li key={index}>
											<MarkdownRenderer
												text={constraint}
												className="ml-2 inline-block"
											/>
										</li>
									),
								)}
							</ul>
						</div>
					)}
					{problem.followUps.length > 0 && (
						<div className="flex flex-col items-start justify-start gap-2">
							<p className="font-semibold">Follow-Ups</p>
							<ul className="flex list-inside list-disc flex-col items-start justify-start gap-2">
								{problem.followUps.map((followUp, index) => (
									<li key={index}>
										<MarkdownRenderer
											text={followUp}
											className="ml-2 inline-block"
										/>
									</li>
								))}
							</ul>
						</div>
					)}
					{problem.hints.length > 0 && (
						<Accordion multiple>
							{problem.topics.length > 0 && (
								<AccordionItem
									value="topics"
									className="hover:bg-accent"
								>
									<AccordionTrigger className="flex flex-row items-center justify-start gap-2 text-base hover:no-underline">
										<Album className="size-4" />
										Topics
									</AccordionTrigger>
									<AccordionContent className="flex flex-row gap-2 p-2 pb-6">
										{problem.topics.map((topic) => (
											<Badge key={topic.id}>
												{topic.name}
											</Badge>
										))}
									</AccordionContent>
								</AccordionItem>
							)}
							{problem.hints.map((hint, index) => (
								<AccordionItem
									key={index}
									value={index}
									className="hover:bg-accent"
								>
									<AccordionTrigger className="flex flex-row items-center justify-start gap-2 rounded-none text-base hover:no-underline">
										<Lightbulb className="size-4" />
										Hint {index + 1}
									</AccordionTrigger>
									<AccordionContent className="flex flex-row gap-2 p-2 pb-6 text-base">
										{hint}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					)}
				</div>
			</div>
		</ScrollArea>
	);
}
