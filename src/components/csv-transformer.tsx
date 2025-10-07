
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Copy,
  Download,
  Loader2,
  Sparkles,
  Trash2,
} from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

type CaseConversion = 'none' | 'uppercase' | 'lowercase';
type QuoteType = 'none' | 'double' | 'single';
type AiSuggestion =
  | 'separator'
  | 'removeDuplicates'
  | 'removeLineBreaks'
  | 'caseConversion';

export function CsvTransformer() {
  const { toast } = useToast();
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [separator, setSeparator] = useState(',');
  const [customSeparator, setCustomSeparator] = useState('');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [caseConversion, setCaseConversion] = useState<CaseConversion>('none');
  const [quoteType, setQuoteType] = useState<QuoteType>('none');
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [removeLineBreaks, setRemoveLineBreaks] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggested, setAiSuggested] = useState<Set<AiSuggestion>>(new Set());
  const [debouncedInput, setDebouncedInput] = useState(inputData);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(inputData);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputData]);

  useEffect(() => {
  }, [debouncedInput]);

  const processData = useCallback(() => {
    let lines = inputData.split(/\r?\n/);

    let processedLines = lines.map(line => {
      let currentLine = line;
      if (removeLineBreaks) {
        currentLine = currentLine.replace(/(\r\n|\n|\r)/gm, ' ').trim();
      }
      currentLine = currentLine.trim();

      if (caseConversion === 'uppercase') {
        currentLine = currentLine.toUpperCase();
      } else if (caseConversion === 'lowercase') {
        currentLine = currentLine.toLowerCase();
      }
      return currentLine;
    });

    processedLines = processedLines.filter(line => line !== '');

    if (removeDuplicates) {
      processedLines = [...new Set(processedLines)];
    }

    const finalLines = processedLines.map(line => {
      let finalLine = `${prefix}${line}${suffix}`;
      if (quoteType === 'double') {
        finalLine = `"${finalLine.replace(/"/g, '""')}"`;
      } else if (quoteType === 'single') {
        finalLine = `'${finalLine.replace(/'/g, "''")}'`;
      }
      return finalLine;
    });

    let currentSeparator = separator === 'other' ? customSeparator : separator;
    if (separator === 'tab') currentSeparator = '\t';
    
    setOutputData(finalLines.join(currentSeparator));
  }, [
    inputData,
    removeDuplicates,
    removeLineBreaks,
    caseConversion,
    quoteType,
    prefix,
    suffix,
    separator,
    customSeparator,
  ]);

  useEffect(() => {
    processData();
  }, [processData]);

  const handleDownload = () => {
    const blob = new Blob([outputData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transformed_data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: 'Download Started',
      description: 'Your CSV file is being downloaded.',
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputData);
    toast({
      title: 'Copied to Clipboard',
      description: 'The output has been copied.',
    });
  };

  const handleClear = () => {
    setInputData('');
    setOutputData('');
    setAiSuggested(new Set());
    toast({
      title: 'Input Cleared',
    });
  };

  const AiBadge = ({ id }: { id: AiSuggestion }) =>
    aiSuggested.has(id) ? (
      <span
        className="ml-2 flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent-foreground"
        title="Suggested by AI"
      >
        <Sparkles className="h-3 w-3 text-accent" />
        AI
      </span>
    ) : null;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Input Data</CardTitle>
            <CardDescription>
              Paste your column of data or list below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={inputData}
              onChange={e => setInputData(e.target.value)}
              placeholder="e.g.&#10;Apple&#10;Banana&#10;Orange"
              className="min-h-[200px] font-mono"
            />
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              disabled={!inputData}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Output CSV</CardTitle>
            <CardDescription>
              This is the live preview of your generated CSV.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={outputData}
              readOnly
              placeholder="Your CSV output will appear here..."
              className="min-h-[200px] font-mono"
            />
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!outputData}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle>Transformation Options</CardTitle>
            <CardDescription>
              Customize your CSV output.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="flex items-center">
                Separator {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                <AiBadge id="separator" />
              </Label>
              <div className="flex gap-2">
                <Select
                  value={separator}
                  onValueChange={setSeparator}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select separator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=",">Comma (,)</SelectItem>
                    <SelectItem value=";">Semicolon (;)</SelectItem>
                    <SelectItem value="tab">Tab</SelectItem>
                    <SelectItem value="|">Pipe (|)</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {separator === 'other' && (
                  <Input
                    value={customSeparator}
                    onChange={e => setCustomSeparator(e.target.value)}
                    className="w-20"
                    maxLength={1}
                    disabled={isLoading}
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prefix</Label>
                <Input
                  value={prefix}
                  onChange={e => setPrefix(e.target.value)}
                  placeholder="e.g. ID-"
                />
              </div>
              <div className="space-y-2">
                <Label>Suffix</Label>
                <Input
                  value={suffix}
                  onChange={e => setSuffix(e.target.value)}
                  placeholder="e.g. -_v1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Enclose in Quotes</Label>
              <Select value={quoteType} onValueChange={v => setQuoteType(v as QuoteType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select quote style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="double">Double Quotes (")</SelectItem>
                  <SelectItem value="single">Single Quotes (')</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <h4 className="flex items-center text-sm font-medium">Data Cleaning {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}</h4>
              <div className="flex items-center justify-between">
                <Label htmlFor="remove-duplicates" className="flex items-center">
                  Remove Duplicates
                  <AiBadge id="removeDuplicates" />
                </Label>
                <Switch
                  id="remove-duplicates"
                  checked={removeDuplicates}
                  onCheckedChange={setRemoveDuplicates}
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="remove-line-breaks" className="flex items-center">
                  Remove Line Breaks
                  <AiBadge id="removeLineBreaks" />
                </Label>
                <Switch
                  id="remove-line-breaks"
                  checked={removeLineBreaks}
                  onCheckedChange={setRemoveLineBreaks}
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center justify-between">
                 <Label htmlFor="case-conversion" className="flex items-center">
                  Case Conversion
                  <AiBadge id="caseConversion" />
                </Label>
                 <Select
                  value={caseConversion}
                  onValueChange={v => setCaseConversion(v as CaseConversion)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-auto">
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="uppercase">UPPERCASE</SelectItem>
                    <SelectItem value="lowercase">lowercase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleDownload}
              disabled={!outputData}
            >
              <Download className="mr-2 h-4 w-4" />
              Download .csv
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
