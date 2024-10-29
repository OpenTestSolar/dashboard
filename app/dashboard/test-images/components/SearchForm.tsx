import React, { memo, useRef } from 'react';
import { SearchIcon } from 'tdesign-icons-react';
import { Button, Col, Form, Input, MessagePlugin, Row } from 'tdesign-react';
import { FormInstanceFunctions, SubmitContext } from 'tdesign-react/es/form/type';

const { FormItem } = Form;

export type FormValueType = {
  name?: string;
  status?: string;
  number?: string;
  time?: string;
  type?: string;
};

export type SearchFormProps = {
  onCancel: () => void;
  onSubmit: (values: FormValueType) => Promise<void>;
};

const SearchForm: React.FC<SearchFormProps> = () => {
  const formRef = useRef<FormInstanceFunctions>();
  const onSubmit = (e: SubmitContext) => {
    if (e.validateResult === true) {
      MessagePlugin.info('提交成功');
    }
    const queryValue = formRef?.current?.getFieldsValue?.(true);
    console.log('form 数据', queryValue);
  };

  return (
    <div className='list-common-table-query'>
      <Form ref={formRef} onSubmit={onSubmit} labelWidth={80} colon>
        <Row>
          <Col flex='50%'>
            <Row>
              <Col>
                <FormItem name='name'>
                  <Input placeholder='请输入镜像库名称' />
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col flex='50%'>
            <Button icon={<SearchIcon />} theme='primary' type='submit' style={{ margin: '0px 20px' }}>
              查询
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default memo(SearchForm);
