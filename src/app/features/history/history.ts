import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QrCodeResponse } from '../../core/models';
import { QrCode } from '../../core/services/qr-code';

@Component({
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History implements OnInit {
  history: QrCodeResponse[] = [];


  filteredHistory: QrCodeResponse[] = [];
  selectedFilter = 'ALL';
  filters = ['ALL', 'URL', 'TEXT', 'EMAIL', 'WIFI', 'VCARD'];
  isLoading = false;
  errorMessage = '';
  deletingId: number | null = null;

  constructor(private qrCodeService: QrCode) {}

  getTypeIcon(code: string): string {
  const icons: Record<string, string> = {
    URL: '🔗', TEXT: '📝', EMAIL: '✉️', WIFI: '📶', VCARD: '👤'
  };
  return icons[code] ?? '🔲';
}
  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.qrCodeService.getHistory().subscribe({
      next: (data) => {
        this.history = data;
        this.filteredHistory = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement de l\'historique';
        this.isLoading = false;
      }
    });
  }

  applyFilter(filter: string): void {
    this.selectedFilter = filter;

    if (filter === 'ALL') {

      this.filteredHistory = this.history;
    } else {

      this.filteredHistory = this.history.filter(qr => qr.contentType === filter);
    }
  }

  delete(id: number): void {

    this.deletingId = id;

    this.qrCodeService.delete(id).subscribe({
      next: () => {

        this.history = this.history.filter(qr => qr.id !== id);
        this.filteredHistory = this.filteredHistory.filter(qr => qr.id !== id);
        this.deletingId = null;
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la suppression';
        this.deletingId = null;
      }
    });
  }

  downloadPng(qr: QrCodeResponse): void{
    this.qrCodeService.downloadPng(qr);
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }


  getBadgeClass(type: string): string {
    const classes: {[key: string]: string} = {
      'URL':   'bg-primary',
      'TEXT':  'bg-secondary',
      'EMAIL': 'bg-warning text-dark',
      'WIFI':  'bg-success',
      'VCARD': 'bg-info text-dark'
    };

    return classes[type] || 'bg-secondary';
  }
}
