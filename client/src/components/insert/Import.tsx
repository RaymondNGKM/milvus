import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, Divider } from '@material-ui/core';
import CustomSelector from '../customSelector/CustomSelector';
import { FC, useState } from 'react';
import { InsertImportProps } from './Types';
import Uploader from '../uploader/Uploader';
import { INSERT_CSV_SAMPLE } from '../../consts/Insert';
import { parseByte } from '../../utils/Format';

const getStyles = makeStyles((theme: Theme) => ({
  tip: {
    color: theme.palette.milvusGrey.dark,
    fontWeight: 500,
    marginBottom: theme.spacing(1),
  },
  selectors: {
    '& .selectorWrapper': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      marginBottom: theme.spacing(3),

      '& .selectLabel': {
        fontSize: '14px',
        lineHeight: '20px',
        color: '#010e29',
      },

      '& .divider': {
        width: '20px',
        margin: theme.spacing(0, 4),
        backgroundColor: theme.palette.milvusGrey.dark,
      },
    },

    '& .selector': {
      flexBasis: '40%',
      minWidth: '256px',
    },

    '& .isContainSelect': {
      paddingTop: theme.spacing(2),
    },
  },

  uploadWrapper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1),
    backgroundColor: '#f9f9f9',

    '& .text': {
      color: theme.palette.milvusGrey.dark,
    },

    '& .file': {
      marginBottom: theme.spacing(1),
    },

    '& .uploaderWrapper': {
      display: 'flex',
      alignItems: 'center',

      border: '1px solid #e9e9ed',
      borderRadius: '4px',
      padding: theme.spacing(1),

      backgroundColor: '#fff',

      '& .uploader': {
        marginRight: theme.spacing(1),
      },
    },

    '& .sampleWrapper': {
      '& .sample': {
        backgroundColor: '#fff',
        padding: theme.spacing(2),
        margin: theme.spacing(1, 0),
      },
    },

    '& .title': {
      marginTop: theme.spacing(1),
    },

    '& .noteList': {
      marginTop: theme.spacing(1),
      paddingLeft: theme.spacing(3),
    },

    '& .noteItem': {
      maxWidth: '560px',
    },
  },
}));

const InsertImport: FC<InsertImportProps> = ({
  collectionOptions,
  partitionOptions,
  isContainedOptions,

  selectedCollection,
  selectedPartition,
  isContainFieldNames,

  handleCollectionChange,
  handlePartitionChange,
  handleIsContainedChange,

  handleUploadedData,
}) => {
  const { t: insertTrans } = useTranslation('insert');
  const { t: collectionTrans } = useTranslation('collection');
  const { t: partitionTrans } = useTranslation('partition');
  const classes = getStyles();
  const [fileName, setFileName] = useState<string>('');

  return (
    <section>
      <Typography className={classes.tip}>
        {insertTrans('targetTip')}
      </Typography>

      <form className={classes.selectors}>
        <div className="selectorWrapper">
          <CustomSelector
            options={collectionOptions}
            wrapperClass="selector"
            labelClass="selectLabel"
            value={selectedCollection}
            variant="filled"
            label={collectionTrans('collection')}
            onChange={(e: { target: { value: unknown } }) => {
              const collection = e.target.value;
              handleCollectionChange(collection as string);
            }}
          />
          <Divider classes={{ root: 'divider' }} />
          <CustomSelector
            options={partitionOptions}
            wrapperClass="selector"
            labelClass="selectLabel"
            value={selectedPartition}
            variant="filled"
            label={partitionTrans('partition')}
            onChange={(e: { target: { value: unknown } }) => {
              const partition = e.target.value;
              handlePartitionChange(partition as string);
            }}
          />
        </div>

        <label>
          <Typography className={classes.tip}>
            {insertTrans('isContainFieldNames')}
          </Typography>
        </label>
        <CustomSelector
          options={isContainedOptions}
          wrapperClass="selector"
          classes={{ filled: 'isContainSelect' }}
          value={isContainFieldNames}
          variant="filled"
          onChange={(e: { target: { value: unknown } }) => {
            const isContainedValue = e.target.value;
            console.log('isContained value', isContainedValue);
            handleIsContainedChange(isContainedValue as number);
          }}
        />
      </form>

      <div className={classes.uploadWrapper}>
        <Typography className="text file" variant="body1">
          {insertTrans('file')}
        </Typography>
        <div className="uploaderWrapper">
          <Uploader
            btnClass="uploader"
            label={insertTrans('uploaderLabel')}
            accept=".csv"
            setFileName={setFileName}
            handleUploadedData={handleUploadedData}
            maxSize={parseByte('5m')}
            overSizeWarning={insertTrans('overSizeWarning')}
          />
          <Typography className="text">
            {fileName || insertTrans('fileNamePlaceHolder')}
          </Typography>
        </div>

        <div className="sampleWrapper">
          <Typography variant="body2" className="text title">
            {insertTrans('sample')}
          </Typography>
          <pre className="sample">{INSERT_CSV_SAMPLE}</pre>
        </div>

        <Typography variant="body2" className="text title">
          {insertTrans('noteTitle')}
        </Typography>
        <ul className="noteList">
          {insertTrans('notes', { returnObjects: true }).map(note => (
            <li key={note} className="text noteItem">
              <Typography>{note}</Typography>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default InsertImport;
