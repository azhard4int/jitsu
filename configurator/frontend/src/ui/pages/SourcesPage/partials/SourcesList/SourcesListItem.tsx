// @Libs
import React, { memo, useCallback, useMemo } from 'react';
import { generatePath } from 'react-router-dom';
import { Button, List } from 'antd';
// @Icons
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
// @Types
import { SourcesListItemProps as Props } from './SourcesList.types';
// @Routes
import { routes } from '@page/SourcesPage/routes';
// @Styles
import styles from './SourcesListItem.module.less';

const SourcesListItemComponent = ({ sourceId, sourceProto, handleDeleteSource }: Props) => {
  const itemDescription = useMemo(() => <div>Source ID: {sourceId}</div>, [sourceId]);

  const handleDelete = useCallback(() => handleDeleteSource(sourceId), [sourceId, handleDeleteSource]);

  return (
    <List.Item
      key={sourceId}
      className={styles.sourcesListItem}
      actions={[
        <Button icon={<EditOutlined />} key="edit" shape="round" href={generatePath(routes.editExact, { sourceId })}>
          Edit
        </Button>,
        <Button icon={<DeleteOutlined />} key="delete" shape="round" onClick={handleDelete}>
          Delete
        </Button>
      ]}
    >
      <List.Item.Meta avatar={sourceProto?.pic} title={sourceProto?.displayName} description={itemDescription} />
    </List.Item>
  );
};

SourcesListItemComponent.displayName = 'SourcesListItem';

export const SourcesListItem = memo(SourcesListItemComponent);
