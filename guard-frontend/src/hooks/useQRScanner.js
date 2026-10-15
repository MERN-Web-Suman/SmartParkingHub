import { useState, useEffect } from 'react';

export const useQRScanner = (onScanSuccess) => {
  const [isScanning, setIsScanning] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [cameraPermission, setCameraPermission] = useState('granted');
  const [lastScannedResult, setLastScannedResult] = useState(null);

  const startScanner = () => {
    setIsScanning(true);
  };

  const stopScanner = () => {
    setIsScanning(false);
  };

  const toggleTorch = () => {
    setTorchOn((prev) => !prev);
  };

  const simulateScan = (code) => {
    setLastScannedResult(code);
    if (onScanSuccess) {
      onScanSuccess(code);
    }
  };

  return {
    isScanning,
    startScanner,
    stopScanner,
    torchOn,
    toggleTorch,
    cameraPermission,
    lastScannedResult,
    simulateScan
  };
};
