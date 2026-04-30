'use client';
import { useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useField } from 'formik';

interface ImageUploadProps {
  name: string;
}

export function ImageUpload({ name }: ImageUploadProps) {
  const [field, meta, helpers] = useField(name);

  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
        }

        objectUrlRef.current = URL.createObjectURL(file);

        helpers.setValue({
          file: file,
          previewUrl: objectUrlRef.current,
        });

        helpers.setError(undefined);
      }
    },
    [helpers]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxSize: 4 * 1024 * 1024,
    multiple: false,
  });

  let displayUrl: string | null = null;

  if (typeof field.value === 'string') {
    displayUrl = field.value;
  } else if (field.value && typeof field.value === 'object' && field.value.previewUrl) {
    displayUrl = field.value.previewUrl;
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={`relative flex w-full cursor-pointer items-center justify-center rounded-[5px] border-2 border-dashed py-10 transition-all duration-300 ${isDragActive ? 'container-color border-primary' : 'input-bg border-base-300'} ${meta.touched && meta.error ? 'border-error' : ''}`}
      >
        <input {...getInputProps()} />

        {displayUrl ? (
          <Image src={displayUrl} width={80} height={80} alt="Vista previa" className="size-[70px] rounded-full object-cover lg:size-20" />
        ) : (
          <div className="text-muted flex flex-col items-center text-center">
            <PhotoIcon className="size-8" />
            <p className="mt-2 text-sm">{isDragActive ? 'Suelta la imagen aquí' : 'Arrastra o da clic aquí para seleccionar'}</p>
            <p className="text-xs">PNG, JPEG, JPG (Máx. 4MB)</p>
          </div>
        )}
      </div>

      {meta.touched && meta.error ? <div className="ml-1 mt-1 text-xs text-error">{meta.error}</div> : null}
    </div>
  );
}
