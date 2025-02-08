"use client";

import * as React from "react";
import { ReactElement, useEffect, useState } from "react";
import { useChat } from 'ai/react';
import { MemoizedMarkdown } from '@/app/_components/memoized-markdown';
import { useDependenciesData } from "@/hooks/useDependenciesData";
import { execute } from "@/utils/GenerateDependenciesGraphData/execute";
import { transactions } from "@/utils/GenerateDependenciesGraphData/transactions";

export default function ChatBot(): ReactElement {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setDescriptionDataArr, setGraphDataArr, setDistributionDataArr } = useDependenciesData();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [jsCodes, setJsCodes] = useState<string[]>([]);
  const [jsCodeSuccess, setJsCodeSuccess] = useState<boolean>(false);

  useEffect(() => {
    const getGraphData = (generated: { function: string, description: string }) => {
      const graphData = execute(transactions, JSON.stringify(generated));
      return graphData;
    }

    console.log("messages: ", messages);
    const toolIncocation = messages[messages.length - 1]?.toolInvocations?.[0];
    if (toolIncocation && "result" in toolIncocation) {
      console.log("toolIncocation: ", toolIncocation);
      const result = toolIncocation.result;
      if ("code" in result) {
        console.log("code: ", result.code);
        setJsCodeSuccess(false);
        try {
          const graphData = getGraphData({ function: result.code.function, description: result.code.description });
          console.log("graphData: ", graphData);
          setGraphDataArr(prev => [...prev, ...graphData]);
          setJsCodes(prev => [...prev, result.code]);
          setDescriptionDataArr((prev) => {
            return [...prev, {
              resultId: result.code.resultId,
              name: undefined,
              description: result.code.description,
            }]
          });
          setJsCodeSuccess(true);
        } catch (error) {
          alert("Code generation failed. Please try again.");
          console.error("Error generating graph data: ", error);
        }
      }
      if ("list" in result) {
        console.log("distributions: ", result.list.distributions);
        setDistributionDataArr((prev) => {
          return [...prev, ...result.list.distributions]
        });
      }
    }
  }, [messages, setDescriptionDataArr, setDistributionDataArr]);

  return (
    <div className="flex flex-col w-full max-w-xl py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap mb-4">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.toolInvocations?.[0] && 
            <div className="px-4 py-2 mb-4 text-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-md">
              Tool called
            </div>
          }
          {m.toolInvocations?.[0] ? (
            // <div>{m.toolInvocations[0].result.code}</div>
            <>
              {"result" in m.toolInvocations[0] &&
              <>
                {m.toolInvocations[0].result.code && jsCodeSuccess && <MemoizedMarkdown id={m.id} content={`\`\`\`typescript\n${m.toolInvocations[0].result.code.function}\n\`\`\``} />}  
                {m.toolInvocations[0].result.list && 
                <>
                  <div>List in coming...</div>
                </>}
              </>}
            </>
          ) : (
            <MemoizedMarkdown id={m.id} content={m.content} />
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}