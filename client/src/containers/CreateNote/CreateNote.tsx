/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Box, Grid, MenuItem, Stack, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import ButtonSpinner from '../../components/ButtonSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { NoteType } from '../../enums';
import { IoCTypes, useInjection } from '../../ioc';
import { NoteStore } from '../../stores';

const CreateNote = observer(() => {
  const store = useInjection<NoteStore>(IoCTypes.noteStore);
  const { t } = useTranslation(['notes']);

  const [title, setTitle] = useState<boolean>(false);

  return (
    <Grid container justifyContent="center" mt={4}>
      {store.isLoading ? (
        <Box className="absoluteCentered">
          <LoadingSpinner />
        </Box>
      ) : (
        <>
          <Grid item xs={10} sm={8} md={6} lg={4} xl={4}>
            <Box
              component="form"
              autoComplete="off"
              onSubmit={(ev: FormEvent<Element>) => {
                ev.preventDefault();
                store.create();
              }}
            >
              <Stack spacing={2}>
                <Grid item textAlign="center">
                  <h1>{t('action.create')}</h1>
                </Grid>
                <TextField
                  required
                  name={t('properties.title')}
                  label={t('properties.title')}
                  variant="outlined"
                  type="text"
                  placeholder={t('placeholder.title')}
                  value={store.title}
                  onChange={(ev: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    store.changeTitle(ev.target.value);
                    store.title.length >= 3 ? setTitle(true) : setTitle(false);
                  }}
                />
                <TextField
                  select
                  label={t('properties.typeId')}
                  value={store.typeId}
                  onChange={(ev: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    store.changeTypeId(Number(ev.target.value));
                  }}
                  helperText={t('placeholder.typeId')}
                >
                  <MenuItem key={Math.random() * 123} value={0}>
                    {t(`type.${NoteType[0].toLowerCase()}`)}
                  </MenuItem>
                  <MenuItem key={Math.random() * 123} value={1}>
                    {t(`type.${NoteType[1].toLowerCase()}`)}
                  </MenuItem>
                  <MenuItem key={Math.random() * 123} value={2}>
                    {t(`type.${NoteType[2].toLowerCase()}`)}
                  </MenuItem>
                  <MenuItem key={Math.random() * 123} value={3}>
                    {t(`type.${NoteType[3].toLowerCase()}`)}
                  </MenuItem>
                </TextField>
                <TextField
                  name={t('properties.description')}
                  label={t('properties.description')}
                  variant="outlined"
                  type="text"
                  placeholder={t('placeholder.description')}
                  value={store.description}
                  onChange={(ev: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    store.changeDescription(ev.target.value);
                  }}
                />
                <TextField
                  name={t('properties.pictureFileName')}
                  label={t('properties.pictureFileName')}
                  variant="outlined"
                  type="text"
                  placeholder={t('placeholder.pictureFileName')}
                  value={store.pictureFileName}
                  onChange={(ev: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    store.changePictureFileName(ev.target.value);
                  }}
                />
                <ButtonSpinner
                  disabled={title === false}
                  isLoading={store.isLoading}
                  type="submit"
                  text={t('submit')}
                  onClick={() => {
                    null;
                  }}
                  onChange={() => {
                    null;
                  }}
                />
                {(!!store.id || store.id === 0) && <Navigate replace to={`/notes/${store.id}`} />}
                {!!store.error && <ErrorMessage error={store.error} />}
              </Stack>
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
});

export default CreateNote;
