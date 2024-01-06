import { FC, ChangeEvent, RefObject } from 'react';

interface QueryEditorProps {
  refObject?: RefObject<HTMLTextAreaElement>;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  name: string;
  cols?: number;
  rows?: number;
  disabled?: boolean;
}

const QueryEditor: FC<QueryEditorProps> = ({
  refObject,
  value = '',
  onChange,
  className = '',
  name,
  cols = 30,
  rows = 10,
  disabled = false,
}) => (
  <textarea
    ref={refObject}
    value={value}
    onChange={onChange}
    className={className}
    name={name}
    cols={cols}
    rows={rows}
    disabled={disabled}
  />
);

export default QueryEditor;
