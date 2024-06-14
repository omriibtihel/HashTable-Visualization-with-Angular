import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HashTable } from './HashTable';
import { LinkedList } from './LinkedList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'HashTable';
  table: HashTable | null = null;
  newWord: string = '';
  searchResult: boolean | null = null;
  @ViewChild('canvas', { static: true }) canvas?: ElementRef<HTMLCanvasElement>;

  colorPalette: string[] = ['#348888', '#22BABB', '#9EF8EE', '#FA7F08', '#F24405'];

  ngOnInit(): void {
    this.table = new HashTable(5);
    this.drawRect();
  }

  addWord(): void {
    if (this.newWord.trim() !== '') {
      this.table?.add(this.newWord.trim());
      this.newWord = '';
      this.drawRect();
    }
  }

  removeWord(): void {
    if (this.newWord.trim() !== '') {
      this.table?.remove(this.newWord.trim());
      this.newWord = '';
      this.drawRect();
    }
  }

  searchWord(): void {
    if (this.newWord.trim() !== '') {
      this.searchResult = this.table?.contains(this.newWord.trim()) || false;
    } else {
      this.searchResult = null;
    }
  }

  resetSearchResult(): void {
    this.searchResult = null;
  }

  

  drawRect(): void {
    const canvas = this.canvas?.nativeElement;
    if (!canvas || !this.table) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const lists = this.getLists();
    const cellWidth = 100;
    const cellHeight = 30;
    const padding = 10;
    const borderRadius = 5;

    lists.forEach((list, i) => {
      const indexX = padding;
      const indexY = padding + i * (cellHeight + padding);
      ctx.fillStyle = '#CCCCCC';
      ctx.fillRect(indexX, indexY, cellWidth, cellHeight);

      ctx.fillStyle = '#000000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(i.toString(), indexX + cellWidth / 2, indexY + cellHeight / 2);

      let current = list.getHead();
      let j = 0;
      while (current !== null) {
        const x = padding + (j + 1) * (cellWidth + padding);
        const y = padding + i * (cellHeight + padding);

        const word = current.data;

        ctx.fillStyle = this.colorPalette[i];
        ctx.strokeStyle = this.colorPalette[i];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + borderRadius, y);
        ctx.lineTo(x + cellWidth - borderRadius, y);
        ctx.quadraticCurveTo(x + cellWidth, y, x + cellWidth, y + borderRadius);
        ctx.lineTo(x + cellWidth, y + cellHeight - borderRadius);
        ctx.quadraticCurveTo(x + cellWidth, y + cellHeight, x + cellWidth - borderRadius, y + cellHeight);
        ctx.lineTo(x + borderRadius, y + cellHeight);
        ctx.quadraticCurveTo(x, y + cellHeight, x, y + cellHeight - borderRadius);
        ctx.lineTo(x, y + borderRadius);
        ctx.quadraticCurveTo(x, y, x + borderRadius, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#000000';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(word, x + cellWidth / 2, y + cellHeight / 2);

        current = list.getNext(current);
        j++;
      }
    });
  }


  getLists(): LinkedList[] {
    if (!this.table) return [];
    const lists: LinkedList[] = [];
    for (let i = 0; i < this.table.getNumLists(); i++) {
      lists.push(this.table.getList(i));
    }
    return lists;
  }
}
