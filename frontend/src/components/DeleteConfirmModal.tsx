import React, { useState } from 'react';
import { Trash2, AlertCircle, X, ShieldAlert } from '../icons/index.js';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  templateName: string;
  itemType: 'văn bản' | 'trình chiếu';
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  templateName,
  itemType
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      setIsLoading(false);
      onClose();
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-modal-backdrop"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 text-slate-800 dark:text-slate-100 animate-modal-content space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 border border-red-200 dark:border-red-900/40">
            <Trash2 className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Đặc Quyền Quản Trị Viên</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              Xóa Mẫu {itemType === 'văn bản' ? 'Văn Bản' : 'Trình Chiếu'} Dùng Chung?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Bạn có chắc chắn muốn xóa mẫu <strong className="text-slate-900 dark:text-white">"{templateName}"</strong> khỏi thư viện dùng chung của doanh nghiệp?
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>Hành động này sẽ xóa mẫu khỏi kho dùng chung. Các tài liệu cá nhân đã được sao chép trước đây sẽ không bị ảnh hưởng.</span>
        </div>

        <div className="flex items-center justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex items-center space-x-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-red-600/20 transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Đang xóa...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xác Nhận Xóa</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

