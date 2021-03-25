// @Libs
import React, { useCallback, useMemo } from 'react';
import { Button, Dropdown, List, message } from 'antd';
// @Components
import { ConnectorsCatalog } from '../_common/ConnectorsCatalog';
import { SourcesListItem } from './SourcesListItem';
// @Icons
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
// @Services
import ApplicationServices from '@service/ApplicationServices';
// @Types
import { SourceConnector } from '@connectors/types';
import { CommonSourcePageProps } from '@page/SourcesPage/SourcesPage.types';
// @Styles
import './SourcesListItem.module.less';
// @Sources
import { allSources } from '@connectors/sources';

const SourcesList = ({ projectId, sources, setSources }: CommonSourcePageProps) => {
  const services = useMemo(() => ApplicationServices.get(), []);

  const sourcesMap = useMemo(
    () =>
      allSources.reduce(
        (accumulator: { [key: string]: SourceConnector }, current: SourceConnector) => ({
          ...accumulator,
          [current.id]: current
        }),
        {}
      ),
    []
  );

  const handleDeleteSource = useCallback(
    (sourceId: string) => {
      const updatedSources = [...sources.filter((source: SourceData) => sourceId !== source.sourceId)];

      services.storageService.save('sources', { sources: updatedSources }, projectId).then(() => {
        setSources({ sources: updatedSources });

        message.success('Sources list successfully updated');
      });
    },
    [sources, setSources, services.storageService, projectId]
  );

  return (
    <>
      <div className="sources-list__header">
        <Dropdown trigger={['click']} overlay={<ConnectorsCatalog />}>
          <Button type="primary" icon={<PlusOutlined />}>
            Add source
          </Button>
        </Dropdown>
      </div>

      {sources?.length > 0
        ? (
          <List key="sources-list" className="sources-list" itemLayout="horizontal" split={true}>
            {sources.map((source) => {
              const sourceProto = sourcesMap[source.sourceId];

              return (
                <SourcesListItem
                  handleDeleteSource={handleDeleteSource}
                  sourceProto={sourceProto}
                  sourceId={source.sourceId}
                  key={source.sourceId}
                />
              );
            })}
          </List>
        ) :
        <div>No data</div>
      }
    </>
  );
};

SourcesList.displayName = 'SourcesList';

export { SourcesList };
