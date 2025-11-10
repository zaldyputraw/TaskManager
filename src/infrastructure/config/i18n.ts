import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const en = {
  translation: {
    'app_title': 'Task Manager',
    'login_title': 'Login',
    'signup_title': 'Sign Up',
    'full_name': 'Full Name',
    'email': 'Email',
    'password': 'Password',
    'login_button': 'Login',
    'signup_button': 'Sign Up',
    'dont_have_account': "Don't have an account?",
    'already_have_account': 'Already have an account?',
    'new_task': 'New Task',
    'task_title': 'Task Title',
    'description': 'Description (optional)',
    'save_task': 'Save Task',
    'cancel': 'Cancel',
    'status': 'Status',
    'status_todo': 'To Do',
    'status_in_progress': 'In Progress',
    'status_done': 'Done',
    'all_tasks': 'ALL',
    'filter_todo': 'TO DO',
    'filter_in_progress': 'IN PROGRESS',
    'filter_done': 'DONE',
    'no_tasks_found': 'No tasks found.',
    'logout': 'Logout',
    'welcome': 'Welcome back, {{name}}!',
    'board_todo': 'To Do',
    'board_in_progress': 'In Progress',
    'board_done': 'Done',
    'edit_task': 'Edit Task',
    'delete_task': 'Delete Task',
    'confirm_delete': 'Are you sure you want to delete this task?',
  },
};

// Indonesian translations
const id = {
  translation: {
    'app_title': 'Manajer Tugas',
    'login_title': 'Masuk',
    'signup_title': 'Daftar',
    'full_name': 'Nama Lengkap',
    'email': 'Email',
    'password': 'Kata Sandi',
    'login_button': 'Masuk',
    'signup_button': 'Daftar',
    'dont_have_account': 'Belum punya akun?',
    'already_have_account': 'Sudah punya akun?',
    'new_task': 'Tugas Baru',
    'task_title': 'Judul Tugas',
    'description': 'Deskripsi (opsional)',
    'save_task': 'Simpan Tugas',
    'cancel': 'Batal',
    'status': 'Status',
    'status_todo': 'Untuk Dikerjakan',
    'status_in_progress': 'Sedang Dikerjakan',
    'status_done': 'Selesai',
    'all_tasks': 'SEMUA',
    'filter_todo': 'UNTUK DIKERJAKAN',
    'filter_in_progress': 'SEDANG DIKERJAKAN',
    'filter_done': 'SELESAI',
    'no_tasks_found': 'Tidak ada tugas ditemukan.',
    'logout': 'Keluar',
    'welcome': 'Selamat datang kembali, {{name}}!',
    'board_todo': 'Untuk Dikerjakan',
    'board_in_progress': 'Sedang Dikerjakan',
    'board_done': 'Selesai',
    'edit_task': 'Edit Tugas',
    'delete_task': 'Hapus Tugas',
    'confirm_delete': 'Apakah Anda yakin ingin menghapus tugas ini?',
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: en,
      id: id,
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
